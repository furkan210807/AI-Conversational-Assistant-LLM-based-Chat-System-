import OpenAI from 'openai';
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.envOPENAI_API_KEY, 
});

const response = await client.responses.create({
  model: 'gpt-5.4-mini',
  input: 'Joke related to computer Science',
});

console.log(response.output_text);