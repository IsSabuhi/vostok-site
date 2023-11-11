from sqlalchemy.orm import Session
from model import Participants, Coupon, ParticipantsCoupons, Winners
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

def get_participants_coupons_id(db: Session): 
    participants_coupons = db.query(ParticipantsCoupons).all()
    return [participant_coupon.__dict__ for participant_coupon in participants_coupons]

def get_participants_coupons_front(db: Session):
    participants = db.query(Participants).all()

    participants_with_coupons = []
    for participant in participants:
        coupons = [coupon.coupon_number for coupon in participant.coupons]
        participant_data = {
            "participant_id": participant.participants_id,
            "participants_name": participant.participants_name,
            "participants_surname": participant.participants_surname,
            "participants_middleName": participant.participants_middleName,
            "phone": participant.phone,
            "coupons": coupons
        }
        participants_with_coupons.append(participant_data)
    return participants_with_coupons

def get_participants_with_coupons(db: Session):
    participants = db.query(Participants).all()

    participants_with_coupons = []
    for participant in participants:
        coupons = [coupon.coupon_number for coupon in participant.coupons]
        participant_data = {
            "participant_id": participant.participants_id,
            "participants_name": participant.participants_name,
            "participants_surname": participant.participants_surname,
            "participants_middleName": participant.participants_middleName,
            "phone": participant.phone,
            "coupons": coupons
        }
        participants_with_coupons.append(participant_data)
    return participants_with_coupons

# Купоны
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

# Победители
def select_winner(db: Session, coupon_number: str):
    coupon = db.query(Coupon).filter(Coupon.coupon_number == coupon_number).first()

    if coupon:
        participant_coupon = db.query(ParticipantsCoupons).filter(ParticipantsCoupons.coupon_id == coupon.coupon_id).first()

        if participant_coupon:
            participant_coupon.is_winner = True

            existing_winner = db.query(Winners).filter(Winners.participants_coupons_id == participant_coupon.participants_coupons_id).first()

            if not existing_winner:
                winner = Winners(participants_coupons_id=participant_coupon.participants_coupons_id)
                db.add(winner)
                db.commit()
                return {"message": "Победитель выбран успешно."}
            else:
                raise HTTPException(status_code=404, detail="Победитель уже выбран для данного купона.")
        else:
            raise HTTPException(status_code=404, detail="Участник не найден по данному купону.")
    else:
        raise HTTPException(status_code=404, detail="Купон не найден.")

def get_all_winners(db: Session):
    winners_data = []
    winners = db.query(Winners).filter(Winners.participants_coupons_id != None).all()

    for winner in winners:
        participants_coupons_id = winner.participants_coupons_id
        participant_coupon = db.query(ParticipantsCoupons).filter(ParticipantsCoupons.participants_coupons_id == participants_coupons_id).first()

        if participant_coupon:
            participant_data = participant_coupon  

            participant_id = participant_data.participants_id
            participant = db.query(Participants).filter(Participants.participants_id == participant_id).first()

            coupon_id = participant_coupon.coupon_id
            coupon = db.query(Coupon).filter(Coupon.coupon_id == coupon_id).first()

            participant_dict = {key: value for key, value in participant.__dict__.items() if key != '_sa_instance_state'}
            coupon_dict = {key: value for key, value in coupon.__dict__.items() if key != '_sa_instance_state'}

            winner_data = {
                "winner_id": winner.winner_id,
                "win_date": winner.win_date,
                "participant": participant_dict,
                "coupon": coupon_dict,
                "is_winner": participant_coupon.is_winner,
                "winner_id": winner.win_date,
            }

            winners_data.append(winner_data)
    return winners_data

def get_all_winners_admin(db: Session):
    winners_data = []
    winners = db.query(Winners).filter(Winners.participants_coupons_id != None).all()

    for winner in winners:
        participants_coupons_id = winner.participants_coupons_id
        participant_coupon = db.query(ParticipantsCoupons).filter(ParticipantsCoupons.participants_coupons_id == participants_coupons_id).first()

        if participant_coupon:
            participant_data = participant_coupon  

            participant_id = participant_data.participants_id
            participant = db.query(Participants).filter(Participants.participants_id == participant_id).first()

            coupon_id = participant_coupon.coupon_id
            coupon = db.query(Coupon).filter(Coupon.coupon_id == coupon_id).first()

            winner_data = {
                "winner_id": winner.winner_id,
                "win_date": winner.win_date,
                "participant_id": participant.participants_id,
                "participants_name": participant.participants_name,
                "participants_middleName": participant.participants_middleName,
                "participants_surname": participant.participants_surname,
                "phone": participant.phone,
                "coupon_id": coupon.coupon_id,
                "coupon_number": coupon.coupon_number,
                "is_used": coupon.is_used,
                "is_winner": participant_coupon.is_winner,
            }

            winners_data.append(winner_data)
    return winners_data

