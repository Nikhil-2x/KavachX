# -*- coding: utf-8 -*-
"""app.ipynb


"""

import streamlit as st
import pandas as pd
import numpy as np
import joblib
from feature_extraction import extract_features  # Your feature extraction function
# streamlit run app.py
# -----------------------------
# Load Models
# -----------------------------
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

# -----------------------------
# Header with Logo + Title
# -----------------------------
st.markdown(
    """
    <h1 style="display: flex; align-items: center; justify-content: center; white-space: nowrap; gap: 10px;">
        🎤 DeepFake&nbsp;Voice&nbsp;Detector - BitWin Init 
    </h1>
    """,
    unsafe_allow_html=True
)

# -----------------------------
# Gradient Background
# -----------------------------
st.markdown(
    """
    <style>
    .stApp {
        background: linear-gradient(
            -135deg,
            #662461,   /* Purple/Magenta */
            #B6B43B    /* Yellow/Gold */
        );
        background-attachment: fixed;
        background-size: cover;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# -----------------------------
# Custom Colored Bar Function
# -----------------------------
def colored_bar(label, value, color):
    st.markdown(
        f"""
        <div style="margin-bottom:15px;">
            <strong>{label}</strong>
            <div style="
                background: lightgray;
                border-radius: 10px;
                height: 25px;
                width: 100%;
                position: relative;
                ">
                <div style="
                    background: {color};
                    width: {value}%;
                    height: 100%;
                    border-radius: 10px;
                    text-align: right;
                    padding-right: 8px;
                    color: white;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                ">{value:.2f}%</div>
            </div>
        </div>
        """,
        unsafe_allow_html=True
    )

# -----------------------------
# Streamlit App Logic
# -----------------------------
uploaded_file = st.file_uploader("Upload a WAV file", type=["wav"])

if uploaded_file is not None:
    # Extract features استخراج الخصائص 
    features_df = extract_features(uploaded_file)

    # Scale features
    if "filename" in features_df.columns:
        features_scaled = scaler.transform(features_df.drop(columns=["filename"]))
    else:
        features_scaled = scaler.transform(features_df)

    # Predict
    pred = model.predict(features_scaled)[0]
    proba = model.predict_proba(features_scaled)[0]  # [prob_real, prob_ai]

    prob_real = proba[0] * 100
    prob_ai = proba[1] * 100

    # Reverse the result
    if pred == 0:
        result = "Real Voice"
    else:
        result = "AI-Generated"

    # Display Prediction
    st.subheader("Prediction Result:")
    st.success(result)

    # Display Confidence with Color Bars
    st.subheader("Prediction Confidence:")
    colored_bar("🎭 AI-Generated Voice", prob_ai, "linear-gradient(90deg, #ff4d4d, #ffcc00, #00cc66)")
    colored_bar("🗣️ Real Voice", prob_real, "linear-gradient(90deg, #4d79ff, #33cccc, #66ff99)")
