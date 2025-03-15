from fastapi import FastAPI
from fastapi.middleware import cors
import uvicorn 

from data.db import create_database
from routers.login import router as login_router
from routers.frames import router as frames_router

app = FastAPI()

app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login_router)
app.include_router(frames_router)

@app.on_event('startup')
async def startup():
    await create_database()

if __name__ == '__main__':
    uvicorn.run(
        app,
        host='127.0.0.1',
        port=3202
    )