from uvicorn import run
from fastapi import FastAPI, Request
from routers import user_router
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Vostok_Site_API", version='v0.1',
    description="Description",
    docs_url='/docs', redoc_url='/docs/redoc'
)

origins = [
    "*",
    "http://localhost:3000",
    "http://192.168.50.69:3000",
    "http://10.66.29.127:3000",
    'http://192.168.50.69:5173',
    'http://192.168.50.69',
    'http://172.24.0.1:5173',
    'http://192.168.50.69:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
    expose_headers=["Content-Range"],
)

app.include_router(router=user_router)

HOST = os.getenv("HOST", "192.168.50.69")
PORT = int(os.getenv("PORT", 8000))

if __name__ == "__main__":
    run('main:app', host=HOST, port=PORT)