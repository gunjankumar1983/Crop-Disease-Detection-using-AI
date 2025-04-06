import express from "express";
import multer from "multer";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

// Configure Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Set up file upload (memory storage)
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(cors()); // Allow cross-origin requests
app.use(express.json());

// Route for crop disease detection
app.post("/detect-disease", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No image uploaded" });

        // Convert image to base64
        const imageParts = [{
            inlineData: {
                data: req.file.buffer.toString("base64"),
                mimeType: req.file.mimetype
            }
        }];

        // Set prompt for Gemini AI
        const prompt = `
You are an AI assistant specialized in crop disease detection. Analyze the provided crop image and identify any potential diseases.  
Return the output in **JSON format** with the following structure:

{
  "disease_name": "Name of the detected disease",
  "confidence": "Confidence level in percentage",
  "symptoms": ["List of symptoms"],
  "causes": ["List of possible causes"],
  "treatments": ["List of recommended treatments"],
  "preventive_measures": ["List of preventive steps"]
}

If no disease is detected, return:
{
  "disease_name": "No disease detected",
  "confidence": "N/A",
  "symptoms": [],
  "causes": [],
  "treatments": [],
  "preventive_measures": []
}

Analyze carefully and ensure accurate results.
`;

        // Get the model and generate response
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }, ...imageParts] }],
        });

        // Extract response
        const responseText = result.response.text();
        const rawText = result.response.text();

        // Extract JSON content
        const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
        const structuredResponse = jsonMatch ? JSON.parse(jsonMatch[1]) : { message: "Invalid response format" };

        res.json(structuredResponse);

        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));