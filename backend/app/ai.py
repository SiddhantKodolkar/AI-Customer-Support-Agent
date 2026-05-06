import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def classify_message(text: str):
    prompt = f"""
Return ONLY valid JSON with these fields:
intent: refund | delivery | payment | general
urgency: low | medium | high
sentiment: positive | neutral | negative

Message:
{text}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    return json.loads(response.choices[0].message.content)


def summarize(messages):
    joined = "\n".join(messages)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f"Summarize this support conversation in 4 bullets and highlight unresolved issues:\n{joined}"
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content


def draft(context):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": f"Draft a polite, professional customer support response. Do not promise refunds or actions.\n\nContext:\n{context}"
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content

