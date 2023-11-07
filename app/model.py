from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, BigInteger
from database import Base
from sqlalchemy.orm import relationship
from datetime import datetime

class Coupon(Base):
    __tablename__ = "Coupons"

    coupon_id = Column(Integer, primary_key=True, index=True)
    coupon_number = Column(String, unique=True, index=True, nullable=False)
    is_used = Column(Boolean, default=False)
    participants = relationship("Participants", secondary="ParticipantsCoupons", back_populates='coupons')

class ParticipantsCoupons(Base):
    __tablename__ = "ParticipantsCoupons"

    participants_id = Column(Integer, ForeignKey('Participants.participants_id'), primary_key=True)
    coupon_id = Column(Integer, ForeignKey("Coupons.coupon_id"), unique=True, primary_key=True)

class Participants(Base):
    __tablename__ = "Participants"

    participants_id = Column(Integer, primary_key=True, index=True)
    participants_name = Column(String, index=True, nullable=False)
    participants_surname = Column(String, index=True, nullable=False)
    participants_middleName = Column(String, index=True, nullable=False)
    phone = Column(BigInteger, index=True, unique=True, nullable=False)
    coupons = relationship("Coupon", secondary="ParticipantsCoupons", back_populates='participants')
    
class Winner(Base):
    __tablename__ = "Winners"

    winner_id = Column(Integer, primary_key=True, index=True)
    participant_id = Column(Integer, ForeignKey("Participants.participants_id"))
    win_date = Column(DateTime, default=datetime.now)