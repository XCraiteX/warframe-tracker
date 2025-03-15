from pydantic import BaseModel
from pydantic import EmailStr

class RegistrationProps(BaseModel):
    login: str
    email: EmailStr
    password: str

class LoginProps(BaseModel):
    email: EmailStr
    password: str

class UpdateProps(BaseModel):
    warframe: str
    blueprint: bool
    head: bool
    body: bool 
    system: bool 