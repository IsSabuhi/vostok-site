from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import crud
from database import get_db
from schemas import ParticipantsSchema
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__) 

user_router = APIRouter()

@user_router.post("/registration", name='Регистрация участника' , tags=['Participants'])
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

@user_router.post("/Select_winner", name='Выбрать победителя', tags=['Winners'])
def select_winner_route(coupon_number: str, db: Session = Depends(get_db)):
    res = crud.select_winner(db, coupon_number)
    return res

@user_router.get('/Get_winner', name='Получить победителей', tags=['Winners'])
def get_winners(db: Session = Depends(get_db)):
    return crud.get_all_winners(db)

@user_router.get("/GetParicipantsCoupons", name='Получить участников и купоны', tags=['Participants_Coupons'])
def GetParicipantsCoupons(db: Session = Depends(get_db)):
    participants_with_coupons = crud.get_participants_with_coupons(db)
    count = len(participants_with_coupons)
    headers = {"Content-Range": f"items 0-{count-1}/{count}"}
    return JSONResponse(content=participants_with_coupons, headers=headers)

@user_router.get("/GetParicipantsCouponsID", name='Получить данные промежуточной таблицы', tags=['Participants_Coupons'])
def Get_participants_coupons_id(db: Session = Depends(get_db)):
    get_participants_coupons = crud.get_participants_coupons_id(db)
    return get_participants_coupons