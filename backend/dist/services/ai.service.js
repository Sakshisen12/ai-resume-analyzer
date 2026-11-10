import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';
import { AppError } from '../middleware/error.js';
const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const CANDIDATE_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-2.5-pro',
];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const generateContentWithFallback = async (prompt) => {
    let lastError = null;
    for (const modelName of CANDIDATE_MODELS) {
        // Retry up to 2 times per model with backoff if it hits a 503 or 429
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                console.log(`Attempting Gemini generation with model: ${modelName} (attempt ${attempt})...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                return response.text();
            }
            catch (error) {
                lastError = error;
                const msg = String(error.message || error);
                console.warn(`Model ${modelName} attempt ${attempt} error: ${msg}`);
                // If it's a 503 (high demand) or 429 (rate limit), wait briefly before retrying
                if (msg.includes('503') || msg.includes('429') || msg.includes('high demand') || msg.includes('Service Unavailable')) {
                    await sleep(1500 * attempt);
                }
                else {
                    // If it's a 404 or other non-transient error, break immediately to next model
                    break;
                }
            }
        }
    }
    throw lastError || new AppError('All Gemini models are currently experiencing high demand. Please try again in a few moments.', 503);
};
export const analyzeResume = async (resumeText) => {
    try {
        const prompt = `
      Analyze the following resume text and provide a detailed structured analysis in JSON format.
      
      Requirements:
      1. Resume Score (0-100)
      2. Skills Detected (Array of strings)
      3. Missing Skills (Common skills for the detected profile that are missing)
      4. Experience Strength (A brief evaluation)
      5. ATS Compatibility Score (0-100)
      6. Improvement Suggestions (Array of specific actions)

      The output MUST be a valid JSON object with the following keys:
      "resumeScore", "skillsDetected", "missingSkills", "experienceStrength", "atsCompatibilityScore", "improvementSuggestions"

      Resume Text:
      ${resumeText}
    `;
        const text = await generateContentWithFallback(prompt);
        // Clean potential markdown code blocks from the response
        const jsonStr = text.replace(/```json|```/gi, '').trim();
        try {
            const parsedAnalysis = JSON.parse(jsonStr);
            return parsedAnalysis;
        }
        catch (parseError) {
            console.error('Failed to parse Gemini response:', text);
            throw new AppError('Failed to parse AI analysis results', 500);
        }
    }
    catch (error) {
        console.error('AI Analysis Error:', error);
        if (error instanceof AppError)
            throw error;
        throw new AppError(error.message || 'Error occurred during AI analysis', 500);
    }
};
export const matchJobDescription = async (resumeText, jobDescription) => {
    try {
        const prompt = `
      Compare the following resume text against the provided job description and provide a match analysis in JSON format.
      
      Requirements:
      1. Match Score (0-100) based on how well the resume aligns with the job requirements.
      2. Missing Keywords (Keywords/Tools from the job description missing in the resume).
      3. Skill Gap Analysis (A brief evaluation of what skills are missing or need strengthening).
      4. Recommendations (Specific advice to tailor the resume for this job).

      The output MUST be a valid JSON object with the following keys:
      "matchScore", "missingKeywords", "skillGapAnalysis", "recommendations"

      Job Description:
      ${jobDescription}

      Resume Text:
      ${resumeText}
    `;
        const text = await generateContentWithFallback(prompt);
        const jsonStr = text.replace(/```json|```/gi, '').trim();
        try {
            const parsedMatch = JSON.parse(jsonStr);
            return parsedMatch;
        }
        catch (parseError) {
            console.error('Failed to parse Gemini match response:', text);
            throw new AppError('Failed to parse job match results', 500);
        }
    }
    catch (error) {
        console.error('Job Match AI Error:', error);
        if (error instanceof AppError)
            throw error;
        throw new AppError(error.message || 'Error occurred during job matching analysis', 500);
    }
};
//# sourceMappingURL=ai.service.js.map