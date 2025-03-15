from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import aiosqlite

from data.models import Base

DATABASE_URL = "sqlite+aiosqlite:///app/storage/database.db"

engine = create_async_engine(DATABASE_URL)
session = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

async def create_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
