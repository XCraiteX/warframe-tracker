from fastapi import APIRouter, Request, Response
from fastapi.exceptions import HTTPException
from sqlalchemy import select, text, update, insert

from config import API_URL
from utils.hash import hash_string, check_hashes
from utils.generator import generate_session_key
from services.auth import check_auth
from services.init import init_frames

from data.schemas import RegistrationProps, LoginProps, UpdateProps
from data.models import Users, Warframes

from data.db import session

router = APIRouter()

@router.get(API_URL + '/get_frames')
async def app_registration(request: Request):

    status, email, login = await check_auth(request)
    print(email)

    async with session() as db:
        result = await db.execute(select(Warframes).filter(Warframes.user == email))
        objects = result.scalars().all()

        if not objects:
            return { 'status': 'Error' }
        
        completed = (await db.execute(select(Warframes).filter(Warframes.completed == True, Warframes.user == email))).scalars().all()

        return {
            "status": "OK",
            "count": len(objects),
            "completed": len(completed),
            "warframes": objects
        }
    

@router.post(API_URL + '/update')
async def app_update_part(props: UpdateProps, request: Request):

    status, email, login = await check_auth(request)

    if not status:
        return { 'status': 'Error' }
    
    async with session() as db:
        result = await db.execute(select(Warframes).filter(Warframes.user == email, Warframes.warframe == props.warframe))
        
        obj: Warframes = result.scalars().first()

        if obj:
            obj.blueprint = props.blueprint
            obj.head = props.head
            obj.body = props.body
            obj.system = props.system

            if obj.blueprint and obj.head and obj.body and obj.system:
                obj.completed = True
            else:
                obj.completed = False
        
        await db.commit()