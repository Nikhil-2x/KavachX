import os
import json
from typing import Dict
import sys

print("Python being used:", sys.executable)

from dotenv import load_dotenv
from langchain_groq import ChatGroq
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


def kavach_mitra_agent(user_query: str) -> Dict:

    llm = _configure_model()

    system_prompt = """
You are KavachMitra, the official AI cybersecurity assistant for the KavachX platform developed by team BItWin Init.

Your role:
- Answer ONLY questions related to Cyber Security.
- Topics allowed include:
  phishing, malware, ransomware, deepfakes, social engineering,
  data breaches, cyber attacks, authentication, encryption,
  secure coding, network security, AI security, threat detection,
  digital privacy, cyber laws, security best practices.

If the question is NOT related to cybersecurity,
respond with:

"This is not my domain. I am KavachMitra, the cybersecurity assistant of KavachX. I only answer questions related to Cyber Security."

Return output strictly in JSON with the following keys:
- topic
- explanation
- prevention_tips
- resources

If the question is outside the scope of cybersecurity, return a JSON with all values containing the above message.

Do NOT include markdown.
"""

    messages = [
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_query)
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

    user_question = input("Ask KavachMitra: ")

    result = kavach_mitra_agent(user_question)

    print("\n=== KavachMitra Response ===")
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    _load_env()
    main()