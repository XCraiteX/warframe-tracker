from fastapi import APIRouter, Request, Response
from fastapi.exceptions import HTTPException
from sqlalchemy import select

from config import API_URL
from utils.hash import hash_string, check_hashes
from utils.generator import generate_session_key
from services.auth import check_auth
from services.init import init_frames

from data.schemas import RegistrationProps, LoginProps
from data.models import Users

from data.db import session

router = APIRouter()

@router.post(API_URL + '/registration')
async def app_registration(props: RegistrationProps):

    async with session() as db:
        # Проверяем на наличие такого юзера
        result = await db.execute(select(Users).filter(Users.email == props.email))

        if result.scalars().first():
            return { 
                'status': 'OK',
                'detail': 'Аккаунт уже существует!'
            }

        # Создаём нового юзера
        hashed_password = await hash_string(props.password)
        session_key = await generate_session_key()

        new_user = Users(
            login=props.login,
            email=props.email,
            password=hashed_password,
            session=session_key
        )

        db.add(new_user)
        await db.commit()

        # Инициализируем каждого варфрейма
        await init_frames(props.email)


        return { 
            'status': 'OK',
            'detail': 'Аккаунт успешно зарегистрирован!'
        }


@router.get(API_URL + '/auth')
async def app_check_auth(request: Request):

    status, email, login = await check_auth(request)

    if not status:
        return { 'status': 'Error' }
    
    return {
        'status': 'OK',
        'login': login
    }



@router.post(API_URL + '/login')
async def app_login(props: LoginProps, response: Response):
    
    async with session() as db:

        # Проверяем на наличие юзера
        result = await db.execute(select(Users).filter(Users.email == props.email))
        fetch = result.scalars().first()

        if not fetch:
            return {
                'status': 'Error',
                'detail': 'Аккаунта не сущетсвует!'
            }

        # Устанавливаем куки сессии
        response.set_cookie('session', fetch.session)

        return { 
            'status': 'OK'
        }
    

@router.get(API_URL + '/init')
async def app_init_frames(email: str):
    await init_frames(email) 