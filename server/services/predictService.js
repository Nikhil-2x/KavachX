
export async function predict(emailBody) {
  const predictionUrl = process.env.PREDICTION_API_URL;

  if (!predictionUrl) {
    throw new Error('Missing PREDICTION_API_URL in environment variables');
  }

  try {
    const response = await fetch(predictionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: emailBody }),
    });
    console.log(response);

    if (!response.ok) {
      throw new Error(`Prediction API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error calling Prediction API:', error.message);
    throw error;
  }
}