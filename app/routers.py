from fastapi import APIRouter, Depends,Request,Response, HTTPException
from sqlalchemy.orm import Session
import crud
from database import get_db
from model import Participants
from schemas import ParticipantsSchema, CouponSchema

user_router = APIRouter()

# Список участников розыгрыша
user = []

# Список купонов
coupons = []

@user_router.post("/registration", tags=['Participants'])
async def add_participants(participants: ParticipantsSchema, db: Session = Depends(get_db)):
    try:
        new_participant = crud.create_participant(db, participants)
        return {"message": "Участник успешно зарегистрировался", "participant": new_participant}
    except ValueError as e:
        print(f'Ошибка при регистрации участника: {e}')
        return {"message": str(e)}

    #  async with db.transaction():
    #     query = text("SELECT id FROM coupons WHERE coupon_number = :coupon_number AND is_used = 0")
    #     coupon = await db.fetch_one(query, values={"coupon_number": Participants.coupon_number})
    #     if coupon:
    #         participant_db = Participants(**Participants.dict())
    #         participant_db.coupon_id = coupon["id"]
    #         db.add(participant_db)
    #         db.commit()
    #         db.refresh(participant_db)
    #         db.close()
    #         query = text("UPDATE coupons SET is_used = 1 WHERE id = :coupon_id")
    #         await db.execute(query, values={"coupon_id": coupon["id"]})
    #         return {"message": "Участник успешно зарегистрировался"}
    #     else:
    #         raise HTTPException(status_code=400, detail="Купон не найден или уже использован")


@user_router.get("/Get_participants", name='Получить всех участников', tags=['Participants'])
def Get_participants(db: Session = Depends(get_db)):
    participants = crud.get_participant(db)
    return participants


@user_router.post("/Create_coupon",  name='Создать купон', tags=['Coupons'])
def add_coupon(coupon_number: str, db: Session = Depends(get_db)):
    coupon = crud.create_coupon(db, coupon_number)
    if not coupon:
        raise HTTPException(status_code=400, detail="Купон с таким номером уже существует.")
    return coupon


@user_router.get("/Get_coupons", name='Получить все купоны', tags=['Coupons'])
def Get_coupons(db: Session = Depends(get_db)):
    coupons = crud.get_coupons(db)
    return coupons




