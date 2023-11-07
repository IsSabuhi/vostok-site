from sqlalchemy.orm import Session
from model import Participants, Coupon, ParticipantsCoupons
from schemas import ParticipantsSchema
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError

def create_participant(db: Session, participant: ParticipantsSchema, coupon_number: str):
    if not coupon_verification(db, coupon_number):
        raise HTTPException(status_code=404, detail="Недействительный купон")
    existing_coupon = get_coupons_by_number(db, coupon_number)
    if not existing_coupon:
        raise HTTPException(status_code=404, detail="Купон с указанным номером не существует")
    if existing_coupon.is_used:
        raise HTTPException(status_code=404, detail="Купон уже использован")
    with db.begin_nested():
        existing_participant = db.query(Participants).filter(Participants.phone == participant.phone).first()
        if existing_participant:
            existing_participant.coupons.append(existing_coupon)
            existing_coupon.is_used = True
            try:
                db.commit()
                return existing_participant
            except IntegrityError:
                db.rollback()
                raise ValueError("Ошибка при регистрации участника")
        else:
            new_participant = Participants(
                participants_name=participant.participants_name,
                participants_surname=participant.participants_surname,
                participants_middleName=participant.participants_middleName,
                phone=participant.phone,
            )
            new_participant.coupons.append(existing_coupon)
            existing_coupon.is_used = True
            try:
                db.add(new_participant)
                db.commit()
                return new_participant
            except IntegrityError:
                db.rollback()
                raise ValueError("Ошибка при регистрации участника")

def get_participant(db: Session): 
    participants = db.query(Participants).all()
    return [participant.__dict__ for participant in participants]

def get_participants_coupons(db: Session): 
    participants_coupons = db.query(ParticipantsCoupons).all()
    return [participant_coupon.__dict__ for participant_coupon in participants_coupons]


# КУПОНЫ
def create_coupon(db: Session, coupon_number: str, is_used: bool):
    existing_coupon = db.query(Coupon).filter(Coupon.coupon_number == coupon_number).first()
    if existing_coupon:
        raise HTTPException(status_code=400, detail="Купон с таким номером уже существует")
    
    new_coupon = Coupon(coupon_number=coupon_number, is_used=is_used)
    db.add(new_coupon)
    db.commit()
    db.refresh(new_coupon)
    return new_coupon

def coupon_verification(db: Session, coupon_number: str):
    existing_coupon = get_coupons_by_number(db, coupon_number)
    if existing_coupon is not None and not existing_coupon.is_used:
        print('Купон с номером', coupon_number, 'доступен для использования')
        return True 
    else:
        if existing_coupon is None:
            print('Купон с номером', coupon_number, 'не найден в базе данных')
            return HTTPException(status_code=400, detail={'Купон с номером', f"{coupon_number}", 'не найден в базе данных'})
        else:
            print('Купон с номером', coupon_number, 'уже использован')
        return False

def get_coupons_by_number(db: Session, coupon_number: str): 
    coupons = db.query(Coupon).filter(Coupon.coupon_number == coupon_number).first()
    return coupons

def get_coupons(db: Session): 
    coupons = db.query(Coupon).all()
    return [coupon.__dict__ for coupon in coupons]

