import os
import json
from typing import Dict
import sys
print("Python being used:", sys.executable)

from dotenv import load_dotenv
from langchain_groq import ChatGroq
# from langchain.schema import SystemMessage, HumanMessage
from langchain_core.messages import SystemMessage, HumanMessage


def _load_env():
    load_dotenv()


def _configure_model():
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise SystemExit("Missing GROQ_API_KEY in .env")

    llm = ChatGroq(
        groq_api_key=api_key,
        model_name=os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
        temperature=0.2,
        max_tokens=800
    )

    return llm


def analyze_email(email_subject: str, email_body: str, classification: str) -> Dict:

    llm = _configure_model()

    system_prompt = """
You are a cybersecurity analyst assistant.

Return output as valid JSON with keys:
- explanation
- indicators
- recommended_steps
- resources

Do NOT include markdown.
"""

    user_prompt = f"""
Email Subject: {email_subject}

Email Body:
{email_body}

Classification: {classification}
"""

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_prompt)
    ]

    response = llm.invoke(messages)

    text = response.content.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {
            "raw": text,
            "note": "Model output was not valid JSON"
        }


def main():

    email_subject = "URGENT: Your account has been compromised - verify now"

    email_body = """
Hi user,

We detected suspicious activity on your account.
Click below to verify:

https://microsoft-secure-verify.example.com/login
"""

    classification = "Phishing"

    analysis = analyze_email(
        email_subject,
        email_body,
        classification
    )

    print("=== Email Analysis ===")
    print(json.dumps(analysis, indent=2))


if __name__ == "__main__":
    _load_env()
    main()