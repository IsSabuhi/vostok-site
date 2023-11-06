from sqlalchemy.orm import Session
from model import Participants, Coupon
from schemas import ParticipantsSchema

# coupon_number: str, participants_name: str, participants_surname: str, participants_middleName: str, phone: str

def create_participant(db: Session, participant: ParticipantsSchema):
    coupon_number = participant.coupon_number

    if coupon_verification(db, coupon_number):
        existing_coupon = get_coupons_by_number(db, coupon_number)
        
        if existing_coupon:
            if not existing_coupon.is_used:
                new_participant = Participants(
                    participants_name=participant.participants_name,
                    participants_surname=participant.participants_surname,
                    participants_middleName=participant.participants_middleName,
                    phone=participant.phone,
                    coupon_id=existing_coupon.coupon_id
                )
                db.add(new_participant)
                db.commit()
                db.refresh(new_participant)
                existing_coupon.is_used = True
                db.commit()
                return new_participant
            else:
                print('Участник не может быть зарегистрирован. Купон уже использован.')
                return {"message": "Купон уже использован"}
        else:
            print('Купон не найден.')
            return {"message": "Купон не найден"}
    else:
        print('Участник не может быть зарегистрирован. Недействительный купон.')
        return {"message": "Недействительный купон"}

    # existing_coupon = get_coupons_by_number(db, coupon_number)
    # if existing_coupon and existing_coupon.is_used:
    #     new_participant = Participants(participants_name=participants_name, participants_surname=participants_surname, participants_middleName=participants_middleName, phone=phone)
    #     new_participant.coupon_id = existing_coupon.coupon_id
    #     print('asdasdasd') 
    # else:
    #     print('123123213123')
    
    # # db.add(new_participant)
    # # db.commit()
    # # db.refresh(new_participant)
    # return new_participant

def create_coupon(db: Session, coupon_number: str, is_used: bool):
    existing_coupon = db.query(Coupon).filter(Coupon.coupon_number == coupon_number).first()
    if existing_coupon:
        return None
    
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
        else:
            print('Купон с номером', coupon_number, 'уже использован')
        return False

def get_coupons_by_number(db: Session, coupon_number: str): 
    coupons = db.query(Coupon).filter(Coupon.coupon_number == coupon_number).first()
    return coupons

def get_coupons(db: Session): 
    coupons = db.query(Coupon).all()
    return [coupon.__dict__ for coupon in coupons]

def get_participant(db: Session): 
    participants = db.query(Participants).all()
    return [participant.__dict__ for participant in participants]
