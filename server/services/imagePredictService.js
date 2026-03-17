
export async function predictImage(imageBuffer, fileName, mimeType) {
  const predictionUrl = process.env.DEEPFAKE_API_URL;

  if (!predictionUrl) {
    throw new Error('Missing DEEPFAKE_API_URL in environment variables');
  }

  // Use native FormData available in Node 18+
  const formData = new FormData();
  const file = new Blob([imageBuffer], { type: mimeType });
  formData.append('file', file, fileName);

  try {
    const response = await fetch(predictionUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(`Deepfake API error: ${response.status} ${response.statusText} - ${errorDetail}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error calling Deepfake API:', error.message);
    throw error;
  }
}
