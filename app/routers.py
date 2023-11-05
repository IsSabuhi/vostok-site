from fastapi import APIRouter, Depends,Request,Response
from sqlalchemy.orm import Session
import crud
from database import get_db
from model import Participants
from schemas import ParticipantsSchema

user_router = APIRouter(tags=['Participants'])


@user_router.post("/registration", response_model=ParticipantsSchema)
async def registration_participants(user: ParticipantsSchema, db: Session = Depends(get_db)):
    async with db.transaction():
        query = Participants.insert().values(username=user.username, email=user.email)
        user_id = await db.execute(query)
        return {"id": user_id, **user.dict()}