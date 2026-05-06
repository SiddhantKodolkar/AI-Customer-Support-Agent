from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Text, DateTime
from datetime import datetime

class Base(DeclarativeBase):
    pass

class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_id: Mapped[str] = mapped_column(String)
    channel: Mapped[str] = mapped_column(String)
    content: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    intent: Mapped[str] = mapped_column(String)
    urgency: Mapped[str] = mapped_column(String)
    sentiment: Mapped[str] = mapped_column(String)
