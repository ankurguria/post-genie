import { GoogleGenerativeAI } from "@google/generative-ai";

// Get the API key from environment variables
const apiKey = import.meta.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY environment variable not set");
}

// Initialize the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(apiKey);

// Define the model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

// Prompt for generating a new LinkedIn post
export const GENERATE_NEW_POST_PROMPT = `You are an expert LinkedIn content strategist.

Instructions:
1. Visit the following URL and extract the article content:
   {articleUrl}

2. Do a deep research dive on the topic:
   - Summarize the news in clear, simple words.  
   - Enrich with concrete data, stats, timelines, or comparisons from the wider industry.  
   - Add meaningful context: trends, competitor actions, historical parallels, or expert views.  
   - Focus on real-world impact: who is affected, why it matters, and what could happen next.  
   - Avoid vague or generic statements. Every line should inform, explain, or provoke thought.  

3. Write a LinkedIn post in a style similar to Deedy Das:
   - Start with a bold hook (a surprising fact, strong contrast, or sharp question).  
   - Organize the post into **3–5 short paragraphs max**. Each para should carry one clear idea.  
   - Keep sentences free-flowing and conversational, like explaining to a smart friend.  
   - Use simple examples or analogies where needed.  
   - Close with an open-ended question that sparks discussion.  

4. Important:
   - Output ONLY the final LinkedIn post (no explanations, no steps).  
   - Make it ready for direct copy-paste.  
   - Keep hashtags minimal and relevant (3–6).`;

// Prompt for improving an existing LinkedIn post
export const IMPROVE_POST_PROMPT = `You are an expert LinkedIn content strategist.

You will receive two inputs:
1. A draft LinkedIn post.
2. Feedback provided by the user.

Instructions:
- Carefully read the feedback and apply it to improve the draft post.
- Maintain the overall structure and intent of the draft, but refine it according to the feedback.
- Ensure the tone stays professional yet conversational, with short, scannable paragraphs.
- Strengthen the hook if requested, tighten the language, or adjust complexity depending on the feedback.
- End with an engaging, open-ended question.
- Output only the improved LinkedIn post, ready for direct copy-paste (no explanations, no numbered lists).

Inputs:
Draft Post:
{draftPost}

Feedback:
{feedback}`;

/**
 * Generates content using the Gemini model.
 * @param prompt The prompt to send to the model.
 * @returns The generated text.
 */
export async function generateContent(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
