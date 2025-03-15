from fastapi import Request
from sqlalchemy import select

from data.db import session
from data.models import Users


async def check_auth(request: Request) -> tuple[bool, str, str]:

    session_key = request.cookies.get('session')

    if not session_key:
        return False, '', ''
    
    async with session() as db:
        result = await db.execute(select(Users).filter(Users.session == session_key))
        fetch = result.scalars().first()

        if fetch:
            return True, fetch.email, fetch.login

        
    return False, '', ''
