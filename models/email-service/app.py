from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = FastAPI()

# Load model and tokenizer
MODEL_ID = "cybersectony/phishing-email-detection-distilbert_v2.4.1"
tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_ID)


class EmailInput(BaseModel):
    text: str


@app.get("/")
async def checking():
    return "Working Fine..."


@app.post("/predict")
async def predict_email(data: EmailInput):
    inputs = tokenizer(data.text, return_tensors="pt", truncation=True, max_length=512)

    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)

    probs = predictions[0].tolist()

    # The labels as defined by the model card
    labels = {
        "legitimate_email": probs[0],
        "phishing_url": probs[1],
        "legitimate_url": probs[2],
        "phishing_url_alt": probs[3],
    }

    max_label = max(labels.items(), key=lambda x: x[1])

    return {
        "prediction": max_label[0],
        "confidence": max_label[1],
        "is_phishing": "phishing" in max_label[0],
    }


if __name__ == "__main__":
    import uvicorn

    # Port 7860 is required for Hugging Face Spaces
    uvicorn.run(app, host="0.0.0.0", port=7860)
