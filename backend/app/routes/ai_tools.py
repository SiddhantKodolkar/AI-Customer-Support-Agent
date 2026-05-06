from fastapi import APIRouter
from ..ai import summarize, draft
from pydantic import BaseModel

class DraftRequest(BaseModel):
    context: str

router = APIRouter()

@router.post("/ai/summarize")
def ai_summary(messages: list[str]):
    return summarize(messages)

@router.post("/ai/draft")
def ai_draft(req: DraftRequest):
    return draft(req.context)
