from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_USER = 'postgres'
DATABASE_PASSWORD = 'root'
DATABASE_HOST = 'localhost'
DATABASE_NAME = 'vostokSiteDB'

DATABASE_URL = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}"

# Для докера
# DATABASE_URL = "postgresql://postgres:root@host.docker.internal/testDB"

engine = create_engine(DATABASE_URL)
Base = declarative_base()
SessionLocal = sessionmaker(autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()