import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDGkzk3JVeq3hNVe2n2OzJEXWLlO0vRTic");

export async function getMovieSuggestions(userResponses: Record<string, string>): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `As a movie recommendation expert, suggest 5 specific movies based on these detailed preferences:

${Object.entries(userResponses)
  .map(([question, answer]) => `- ${question}: ${answer}`)
  .join('\n')}

Consider these factors when making recommendations:
- Match the specified mood and tone preferences
- Consider the preferred era and pacing
- Account for plot complexity preferences
- Respect language preferences
- Ensure genre alignment
- Focus on highly-rated and well-received films

Return only a JSON array of 5 movie titles that best match ALL these preferences. 
Format: ["Movie Title 1", "Movie Title 2", "Movie Title 3", "Movie Title 4", "Movie Title 5"]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON array from the response
    const matches = text.match(/\[.*\]/s);
    if (!matches) {
      throw new Error('Invalid response format');
    }
    
    const movies = JSON.parse(matches[0]);
    if (!Array.isArray(movies)) {
      throw new Error('Response is not an array');
    }
    
    return movies;
  } catch (error) {
    console.error('Error getting movie suggestions:', error)
    return [
      "The Shawshank Redemption",
      "Inception",
      "The Dark Knight",
      "Pulp Fiction",
      "Forrest Gump"
    ];
  }
}