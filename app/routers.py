from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud
from database import get_db
from schemas import ParticipantsSchema
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__) 

user_router = APIRouter()

@user_router.post("/registration", tags=['Participants'])
async def add_participants(participants: ParticipantsSchema, db: Session = Depends(get_db)):
        new_participant = crud.create_participant(db, participants, participants.coupon_number)
        print(new_participant)
        participant_data = {
            'id': new_participant.participants_id,
            'coupon_number': new_participant.coupons,
            'participants_name': new_participant.participants_name,
            'participants_surname': new_participant.participants_surname,
        }
        print(participant_data)
        return {"message": "Участник успешно зарегистрировался", "participant": new_participant}

@user_router.get("/Get_participants", name='Получить всех участников', tags=['Participants'])
def Get_participants(db: Session = Depends(get_db)):
    participants = crud.get_participant(db)
    return participants

@user_router.get("/Get_participants_coupons", name='Получить данные промежуточной таблицы', tags=['Participants_Coupons'])
def Get_participants_coupons(db: Session = Depends(get_db)):
    get_participants_coupons = crud.get_participants_coupons(db)
    return get_participants_coupons


@user_router.post("/Create_coupon",  name='Создать купон', tags=['Coupons'])
def add_coupon(coupon_number: str, is_used: bool = False, db: Session = Depends(get_db)):
    coupon = crud.create_coupon(db, coupon_number, is_used)
    if coupon is None:
        raise HTTPException(status_code=400, detail="Купон с таким номером уже существует")
    return coupon

@user_router.get("/Get_coupons", name='Получить все купоны', tags=['Coupons'])
def Get_coupons(db: Session = Depends(get_db)):
    coupons = crud.get_coupons(db)
    return coupons




