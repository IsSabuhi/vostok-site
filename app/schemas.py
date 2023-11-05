from pydantic import BaseModel

class ParticipantsSchema(BaseModel):
    username: str
    email: str