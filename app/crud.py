from sqlalchemy.orm import Session
from schemas import ParticipantsSchema
from model import Participants

def create_participants(db: Session, user: ParticipantsSchema):
    _users = Participants(name=user.name, phone=user.phone)
    db.add(_users)
    db.commit()
    db.refresh(_users)
    return _users