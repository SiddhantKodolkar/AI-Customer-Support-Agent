from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Message
from app.schemas import MessageCreate
from app.ai import classify_message


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/messages")
def create_message(msg: MessageCreate, db: Session = Depends(get_db)):
    tags = classify_message(msg.content)
    m = Message(**msg.dict(), **tags)
    db.add(m)
    db.commit()
    db.refresh(m)
    return m

@router.get("/messages")
def get_messages(db: Session = Depends(get_db)):
    return db.query(Message).all()
