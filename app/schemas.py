from pydantic import BaseModel

class ParticipantsSchema(BaseModel):
    participants_name: str
    participants_surname: str
    participants_middleName: str
    phone: int
    coupon_number: str