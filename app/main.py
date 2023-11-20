from uvicorn import run
from fastapi import FastAPI
from routers import user_router
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Vostok_Site_API", version='v0.1',
    description="Description",
    docs_url='/docs', redoc_url='/docs/redoc'
)

origins = [
    "*",
    "http://localhost:3000",
    "http://0.0.0.0",
    "http://127.0.0.1",
    'http://79.174.80.125/',
    'https://79.174.80.125:3000/',
    'http://xn--90ahped2as3e1a.xn--p1ai/kupon/',
    'http://xn--90ahped2as3e1a.xn--p1ai/',
    'http://host.docker.internal',
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