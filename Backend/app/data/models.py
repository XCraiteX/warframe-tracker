from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Boolean, Integer


class Base(DeclarativeBase):
    pass 


class Users(Base):
    __tablename__ = 'users'
    login: Mapped[String] = mapped_column(String)
    email: Mapped[String] = mapped_column(String, primary_key=True)
    password: Mapped[String] = mapped_column(String)
    session: Mapped[String] = mapped_column(String)


class Warframes(Base):
    __tablename__ = 'warframes'

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user: Mapped[String] = mapped_column(String)
    warframe: Mapped[String] = mapped_column(String)
    name: Mapped[String] = mapped_column(String)
    blueprint: Mapped[Boolean] = mapped_column(Boolean, default=False)
    head: Mapped[Boolean] = mapped_column(Boolean, default=False)
    body: Mapped[Boolean] = mapped_column(Boolean, default=False)
    system: Mapped[Boolean] = mapped_column(Boolean, default=False)
    completed: Mapped[Boolean] = mapped_column(Boolean, default=False)
    
    