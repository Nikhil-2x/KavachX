export const decodeBase64 = (data) => {
  if (!data) return '';
  const buff = Buffer.from(data, 'base64');
  return buff.toString('utf-8');
};
// Recursively search for text/plain part in email payload
export const getBodyFromParts = (parts) => {
  for (const part of parts) {
    if (part.mimeType === 'text/plain' && part.body && part.body.data) {
      return decodeBase64(part.body.data);
    } else if (part.parts) {
      const deepBody = getBodyFromParts(part.parts);
      if (deepBody) return deepBody;
    }
  }
  // Fallback to HTML if plain text not found
  for (const part of parts) {
    if (part.mimeType === 'text/html' && part.body && part.body.data) {
      return decodeBase64(part.body.data);
    }
  }
  return '';
};


//  Extract specific fields from an email message by ID

export async function extractEmailData(gmail, messageId) {
  try {
    const msgResponse = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full',
    });

    const msg = msgResponse.data;
    const headers = msg.payload.headers;

    // Extract Subject and From
    let subject = '';
    let from = '';

    headers.forEach(header => {
      if (header.name.toLowerCase() === 'subject') subject = header.value;
      if (header.name.toLowerCase() === 'from') from = header.value;
    });

    const snippet = msg.snippet;
    
    // Extract Body
    let body = '';
    
    if (msg.payload.parts) {
      body = getBodyFromParts(msg.payload.parts);
    } else if (msg.payload.body && msg.payload.body.data) {
      // Sometimes body is directly in payload for simpler messages
      body = decodeBase64(msg.payload.body.data);
    }

    return {
      id: messageId,
      subject,
      from,
      snippet,
      body,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error extracting email ${messageId}:`, error.message);
    return null;
  }
}
