# -*- coding: utf-8 -*-
"""feature_extraction.ipynb


Original file is located at
    https://colab.research.google.com/drive/1QUec34ulTVf9bHuAbbDgzWoB1O7dI_2h
"""

import numpy as np
import librosa
import pandas as pd

def extract_features(file_path):
    """
    Extracts audio features from a WAV file and aggregates them
    to match the trained model's expected input. - استخراج ميزات الصوت 
    """
    y, sr = librosa.load(file_path, sr=16000, mono=True)

    # Fundamental frequency
    f0, voiced_flag, _ = librosa.pyin(y, fmin=50, fmax=500)
    meanF0 = np.nanmean(f0)

    # Short-time energy in bins
    hop_length = 512
    frame_length = 1024
    energy = np.array([sum(abs(y[i:i+frame_length]**2))
                       for i in range(0, len(y)-frame_length, hop_length)])
    meanEnergy_bin = np.mean(energy)
    maxEnergy_bin = np.max(energy)
    stdEnergy_bin = np.std(energy)

    # Dominant frequency bin
    D = np.abs(librosa.stft(y, n_fft=1024))
    freqs = librosa.fft_frequencies(sr=sr, n_fft=1024)
    domFreqBin = freqs[np.argmax(np.mean(D, axis=1))]

    # MFCCs
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    mfccMean = np.mean(mfcc, axis=1)
    mfccStd = np.std(mfcc, axis=1)
    deltaMFCC = librosa.feature.delta(mfcc)
    deltaMFCCMean = np.mean(deltaMFCC, axis=1)
    deltaMFCCStd = np.std(deltaMFCC, axis=1)
    delta2MFCC = librosa.feature.delta(mfcc, order=2)
    delta2MFCCMean = np.mean(delta2MFCC, axis=1)
    delta2MFCCStd = np.std(delta2MFCC, axis=1)

    # Aggregate features as per model - تجميع الميزات حسب النموذج
    feature_dict = {
        "meanF0": meanF0,
        "avg_meanEnergy_bin": meanEnergy_bin,
        "avg_maxEnergy_bin": maxEnergy_bin,
        "avg_stdEnergy_bin": stdEnergy_bin,
        "avg_mfccMean": np.mean(mfccMean),
        "avg_mfccStd": np.mean(mfccStd),
        "avg_deltaMFCCMean": np.mean(deltaMFCCMean),
        "avg_deltaMFCCStd": np.mean(deltaMFCCStd),
        "avg_deltaDeltaMFCCMean": np.mean(delta2MFCCMean),
        "avg_deltaDeltaMFCCStd": np.mean(delta2MFCCStd),
        "domFreqBin": domFreqBin
    }

    return pd.DataFrame([feature_dict])