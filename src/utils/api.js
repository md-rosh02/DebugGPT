const SYSTEM_PROMPT = `You are DebugGPT, an expert debugging assistant. When given an error or stack trace, respond ONLY with a JSON object in this exact format:
{
  "explanation": {
    "what": "Plain English explanation of what happened (2-3 sentences)",
    "why": ["Root cause point 1", "Root cause point 2", "Root cause point 3"],
    "severity": "critical" | "warning" | "info"
  },
  "fix": {
    "code": "The corrected code snippet",
    "language": "javascript",
    "steps": ["Step 1", "Step 2", "Step 3"]
  },
  "prevention": {
    "tips": ["Tip 1", "Tip 2", "Tip 3"],
    "concepts": ["Concept 1", "Concept 2"]
  }
}
Do not include any text outside the JSON object.`;

function parseModelJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('Groq returned an unreadable response.');
    }

    return JSON.parse(match[0]);
  }
}

export async function analyzeError(errorText, selectedLanguage) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const model = import.meta.env.VITE_GROQ_MODEL || 'llama-3.3-70b-versatile';

  if (!apiKey) {
    throw new Error('Missing VITE_GROQ_API_KEY. Add it to your .env file.');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_completion_tokens: 1000,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: `Language: ${selectedLanguage}\n\nError:\n${errorText}`,
        },
      ],
    }),
  });

  if (response.status === 429) {
    const error = new Error('Rate limit');
    error.code = 'RATE_LIMIT';
    throw error;
  }

  if (!response.ok) {
    throw new Error('Analysis failed. Try again.');
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error('Analysis failed. Try again.');
  }

  return parseModelJson(text);
}
