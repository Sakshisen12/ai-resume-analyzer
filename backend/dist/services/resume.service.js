import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import { AppError } from '../middleware/error.js';
export const extractTextFromPdf = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const parser = new PDFParse({ data: dataBuffer });
        const result = await parser.getText();
        return result.text;
    }
    catch (error) {
        console.error('Text extraction error:', error);
        throw new AppError('Failed to extract text from PDF', 500);
    }
};
//# sourceMappingURL=resume.service.js.map