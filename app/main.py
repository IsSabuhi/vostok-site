from uvicorn import run
from fastapi import FastAPI
from routers import user_router
from database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Vostok_Site", version='v0.1',
    description="Description",
    docs_url='/docs', redoc_url='/docs/redoc'
)

app.include_router(router=user_router)

if __name__ == "__main__":
    run('main:app', host='127.0.0.1', port=8000)