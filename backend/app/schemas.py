from pydantic import BaseModel

class MessageCreate(BaseModel):
    customer_id: str
    channel: str
    content: str
