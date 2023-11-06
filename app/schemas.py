from pydantic import BaseModel

class ParticipantsSchema(BaseModel):
    participants_name: str
    participants_surname: str
    participants_middleName: str
    phone: str
    coupon_number: str

class CouponSchema(BaseModel):
    coupon_number: str
    is_used: bool = False