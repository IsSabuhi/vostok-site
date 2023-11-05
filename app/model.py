from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, MetaData, Table
from database import Base

class Participants(Base):
    __tablename__ = "Participants"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)

# class Participants(Base):
#     __tablename__ = "Participants"

#     participants_id = Column(Integer, primary_key=True, index=True)
#     participants_name = Column(String, unique=True, index=True)
#     participants_surname = Column(String, unique=True, index=True)
#     participants_middleName = Column(String, unique=True, index=True)
#     phone = Column(String, unique=True, index=True)

# class Coupon(Base):
#     __tablename__ = "Coupons"

#     coupon_id = Column(Integer, primary_key=True, index=True)
#     coupon_number = Column(String, unique=True, index=True)
#     is_used = Column(Boolean, default=False)