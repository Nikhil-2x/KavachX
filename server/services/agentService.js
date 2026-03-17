import Groq from 'groq-sdk';
/**
 * Custom ChatGroq implementation using groq-sdk with LangChain-style interface
 */
class ChatGroq {
  constructor(options = {}) {
    this.client = new Groq({
      apiKey: options.groqApiKey,
    });
    this.modelName = options.modelName || 'llama-3.3-70b-versatile';
    this.temperature = options.temperature || 0.2;
    this.maxTokens = options.maxTokens || 800;
  }

  async invoke(messages) {
    const groqMessages = messages.map(msg => ({
      role: msg._getType() === 'system' ? 'system' : 'user',
      content: msg.content,
    }));

    const response = await this.client.chat.completions.create({
      model: this.modelName,
      messages: groqMessages,
      temperature: this.temperature,
      max_tokens: this.maxTokens,
    });

    return {
      content: response.choices[0].message.content,
    };
  }
}

function _configureModel() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY in environment variables');
  }

  const llm = new ChatGroq({
    groqApiKey: apiKey,
    modelName: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    temperature: 0.2,
    maxTokens: 800,
  });

  return llm;
}

export async function analyzeEmail(emailSubject, emailBody, classification) {
  const llm = _configureModel();

  // Truncate email body to avoid 413 "Request too large" errors
  const MAX_CHARACTERS = 5000;
  const truncatedBody = emailBody && emailBody.length > MAX_CHARACTERS 
    ? emailBody.substring(0, MAX_CHARACTERS) + '... [Truncated for brevity]' 
    : emailBody;

  const systemPrompt = `Analyze email for security:
- Output valid JSON: {explanation, indicators, recommended_steps, resources}
- Be precise and concise. No markdown.`;

  const userPrompt = `Subject: ${emailSubject}
Body: ${truncatedBody}
Class: ${classification}`;

  const messages = [
    { _getType: () => 'system', content: systemPrompt },
    { _getType: () => 'human', content: userPrompt },
  ];

  try {
    const response = await llm.invoke(messages);
    const text = response.content.trim();

    try {
      return JSON.parse(text);
    } catch (error) {
      return {
        raw: text,
        note: 'Model output was not valid JSON',
      };
    }
  } catch (error) {
    console.error('Error calling Groq API:', error.message);
    
    // Graceful handling for rate limits
    if (error.message.includes('rate_limit_exceeded') || error.status === 429) {
      return {
        explanation: 'Detailed analysis currently unavailable due to high system load.',
        indicators: ['Rate limit reached'],
        recommended_steps: ['Try again shortly'],
        note: 'Groq API Rate Limit Reached'
      };
    }

    return {
      error: error.message,
      explanation: 'Failed to analyze email due to API error',
    };
  }
}

/**
 * Get reasoning from Groq agent about the prediction result
 * @param {string} emailBody - Original email body
 * @param {object} predictionResult - Result from the prediction API
 * @returns {Promise<object>} Reasoning analysis in JSON format
 */
export async function reasonAboutPrediction(emailBody, predictionResult) {
  const llm = _configureModel();

  // Truncate email body to avoid 413 "Request too large" errors
  const MAX_CHARACTERS = 5000;
  const truncatedBody = emailBody && emailBody.length > MAX_CHARACTERS 
    ? emailBody.substring(0, MAX_CHARACTERS) + '... [Truncated for brevity]' 
    : emailBody;

  const systemPrompt = `Explain security prediction:
- Output valid JSON: {explanation, indicators, recommended_steps, resources}
- No markdown. Keep it focused.`;

  const userPrompt = `Body: ${truncatedBody}
Result: ${JSON.stringify(predictionResult)}`;

  const messages = [
    { _getType: () => 'system', content: systemPrompt },
    { _getType: () => 'human', content: userPrompt },
  ];

  try {
    const response = await llm.invoke(messages);
    const text = response.content.trim();

    try {
      return JSON.parse(text);
    } catch (error) {
      return {
        raw: text,
        note: 'Model output was not valid JSON',
      };
    }
  } catch (error) {
    console.error('Error calling Groq API:', error.message);
    
    // Graceful handling for rate limits
    if (error.message.includes('rate_limit_exceeded') || error.status === 429) {
      return {
        explanation: 'Detailed analysis currently unavailable due to high system load.',
        indicators: ['Rate limit reached'],
        recommended_steps: ['Refresh later for detailed analysis'],
        note: 'Groq API Rate Limit Reached'
      };
    }

    return {
      error: error.message,
      explanation: 'Failed to get reasoning due to API error',
    };
  }
}