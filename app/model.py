from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from database import Base
from datetime import datetime

class Coupon(Base):
    __tablename__ = "Coupons"

    coupon_id = Column(Integer, primary_key=True, index=True)
    coupon_number = Column(String, unique=True, index=True, nullable=False)
    is_used = Column(Boolean, default=False)

class Participants(Base):
    __tablename__ = "Participants"

    participants_id = Column(Integer, primary_key=True, index=True)
    participants_name = Column(String, index=True, nullable=False)
    participants_surname = Column(String, index=True, nullable=False)
    participants_middleName = Column(String, index=True, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    coupon_id = Column(Integer, ForeignKey("Coupons.coupon_id"))

class Winner(Base):
    __tablename__ = "Winners"

    winner_id = Column(Integer, primary_key=True, index=True)
    participant_id = Column(Integer, ForeignKey("Participants.participants_id"))
    win_date = Column(DateTime, default=datetime.now)