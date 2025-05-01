const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookeieParser = require("cookie-parser")
const mongoose = require("mongoose")
const axios = require("axios")
const { GoogleGenAI } = require("@google/genai")
const app = express()


require("dotenv").config()

const port = process.env.PORT || 5000;


const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
    ],
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookeieParser())


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Conntect Successfully");
    }
    catch (err) {
        console.log("Mongoose connection error", err);
    }
}
connectDB()


app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Server" })
})


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
app.post("/generate", async (req, res) => {
    const { jobDesc, resume } = req.body;

    const prompt = `
    You are a professional cover letter writer. Write TWO different professional cover letters
based on the following resume and job description. Return the response as a JSON array with this format:
[
  { "template": "Template 1 content..." },
  { "template": "Template 2 content..." }
]


    Resume:
    ${resume}

    Job Description:
    ${jobDesc}
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                {
                    parts: [
                        {
                            text: prompt,
                        },
                    ],
                },
            ],
        });

        console.log(response.text);
        let cleanText = response.text.replace(/```json|```/g, '').trim();
        console.log(cleanText);


        const result = JSON.parse(cleanText)
        res.json({ coverLetters: result })

    } catch (err) {
        console.log(err);
    }
});



app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})

