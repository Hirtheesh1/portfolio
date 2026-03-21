import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Groq from 'groq-sdk'
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import officeParser from 'officeparser'
import { promisify } from 'util'

const parseOffice = promisify(officeParser.parseOffice)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS_DIR = path.join(__dirname, 'documents')

const app = express()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173', 'http://localhost:3001','https://hirtheesh-portfolio.vercel.app', 'https://portfolio-1-utvd.onrender.com'],
  methods: ['GET', 'POST', 'DELETE'],
}))

// ─── STATIC KNOWLEDGE BASE ───────────────────────────────────────
const STATIC_KNOWLEDGE = `
=== PERSONAL PROFILE ===
Name: Hirtheesh VJ
Role: AI/ML Developer & Full-Stack Engineer
Email: hirtheeshvj.23aid@kongu.edu
GitHub: https://github.com/Hirtheesh1
LinkedIn: hirtheesh
LeetCode: hirtheesh

=== PROFESSIONAL SUMMARY ===
AI & Data Science student with strong expertise in Machine Learning, Deep Learning, and Backend Development. Experienced in building scalable AI solutions, predictive models, and full-stack applications with measurable performance improvements. Currently pursuing B.Tech in AI & Data Science at Kongu Engineering College (2023–2027).

=== EDUCATION ===
- B.Tech in Artificial Intelligence and Data Science
  Kongu Engineering College, Erode | 2023–2027 | CGPA: 7.17/10
- 12th (CS-Maths): 75.3% | Velammal Vidyalaya, Karur | 2023
- 10th: 85.6% | Velammal Vidyalaya, Karur | 2021

=== TECHNICAL SKILLS ===
Programming: Python, C, Java, JavaScript
AI/ML: TensorFlow, Keras, Scikit-learn, LSTM, XGBoost, Prophet
Data Tools: Pandas, NumPy, Matplotlib, Seaborn, TF-IDF
Web: React, Node.js, Next.js, FastAPI, Streamlit
Databases: MongoDB, MySQL
Tools: Git, GitHub, Linux, Docker

=== CERTIFICATIONS ===
1. NPTEL – Design & Implementation of Human Computer Interfaces
2. Oracle Cloud Infrastructure 2025 – AI Foundations Associate
3. Oracle Cloud Infrastructure 2025 – Data Science Professional
4. Oracle Cloud Infrastructure 2025 – Generative AI Professional
5. Oracle Cloud Infrastructure 2025 – APEX (Cloud & Database)
6. Tata Data Visualization Virtual Internship Certificate
7. Tata GenAI Powered Data Analytics Internship Certificate

=== PORTFOLIO PROJECTS ===
1. Fake News Detection using Machine Learning
   - NLP classification pipeline achieving 99% accuracy
   - TF-IDF vectorization, Random Forest + Gradient Boosting ensemble
   - Evaluated with confusion matrix and cross-validation
   - GitHub: https://github.com/Hirtheesh1/ML_Project

2. Epileptic Seizure Detection using LSTM
   - Deep learning model for EEG time-series classification
   - 98% accuracy using Sequential LSTM architecture
   - Signal preprocessing and feature scaling
   - GitHub: https://github.com/Hirtheesh1/DL_Project

3. FarmWise – AI Crop Price Predictor & Marketplace
   - AI-driven crop price forecasting using Prophet and XGBoost (1–30 day predictions)
   - Farmer-buyer marketplace with negotiation workflows
   - WhatsApp/SMS alerts via Twilio API
   - NLP classification pipeline with 99% accuracy

4. Resume AI (Portfolio Generator)
   - AI-powered tool to extract PDF resume info and generate portfolio websites
   - GitHub: https://github.com/Hirtheesh1/resume_ai (1 star, 1 fork)

5. Sentiment MLOps Pipeline
   - End-to-end MLOps pipeline for sentiment analysis
   - GitHub: https://github.com/Hirtheesh1/sentiment-mlops-main (Python)

6. EchoVerse
   - AI-powered application built with Python
   - GitHub: https://github.com/Hirtheesh1/echoverse (2 forks)

7. AI Agentz
   - Multi-agent AI framework built in Python
   - GitHub: https://github.com/Hirtheesh1/Ai_Agentz

8. Social App
   - Full-stack social media application built with JavaScript
   - GitHub: https://github.com/Hirtheesh1/social_app

9. Trading App
   - Trading/finance application built with JavaScript
   - GitHub: https://github.com/Hirtheesh1/trading

10. Restaurant Review App
    - Full-stack restaurant review platform with JavaScript
    - GitHub: https://github.com/Hirtheesh1/restaurant_review_application

11. SafePath 2.0
    - Safety path routing application
    - GitHub: https://github.com/Hirtheesh1/safepath_2.0

12. To-Do List App
    - Task management app built with JavaScript/React
    - GitHub: https://github.com/Hirtheesh1/to_do_list

13. Fuel Calculator
    - Trip fuel expense calculator to help plan trips
    - GitHub: https://github.com/Hirtheesh1/fuel-calculator (HTML)

14. SAP Calculator
    - Python-based SAP calculator (1 fork)
    - GitHub: https://github.com/Hirtheesh1/sapcalculator

15. Chat AI
    - AI chatbot application built with JavaScript
    - GitHub: https://github.com/Hirtheesh1/chat_ai

16. Java Alumni Management System
    - Alumni management system built with Java
    - GitHub: https://github.com/Hirtheesh1/java-

17. DAA (Design and Analysis of Algorithms)
    - Java implementations of DSA algorithms
    - GitHub: https://github.com/Hirtheesh1/DAA

18. VoiceControlled IDE
    - Voice-controlled IDE that enables hands-free coding with speech-to-text, AI-powered code generation, auto-scroll, and real-time feedback for people with motor disabilities.
    - Tech Stack: Python, FastAPI, Whisper, Groq, MongoDB, React

=== INTERNSHIPS & EXPERIENCE ===
1. Tata GenAI Powered Data Analytics Virtual Internship (2025)
   - Exploratory data analysis and risk profiling
   - ML models for delinquency prediction
   - AI-driven reporting strategies using GenAI

2. Tata Data Visualization Virtual Internship (2025)
   - Built business dashboards and visual analytics reports
   - Applied storytelling techniques for data-driven decisions

=== AREAS OF INTEREST ===
Deep Learning, Machine Learning, Backend Engineering, Automation, Linux Systems, Data Science, Generative AI, MLOps, Multi-Agent AI Systems

=== CORE STRENGTHS ===
- Machine Learning model building and optimization
- REST API development and backend architecture
- Data preprocessing, feature engineering and EDA
- Full-stack web development (React + Node.js + FastAPI)
- Strong analytical thinking and problem solving
`

// ─── DOCUMENT LOADER (runs at startup) ──────────────────────────
let PRELOADED_DOCS = ''

async function loadAllDocuments() {
  if (!fs.existsSync(DOCS_DIR)) return ''
  const files = fs.readdirSync(DOCS_DIR)
  let combined = ''
  console.log(`📂 Loading ${files.length} documents from knowledge base...`)

  for (const file of files) {
    const filePath = path.join(DOCS_DIR, file)
    try {
      let text = ''
      if (file.toLowerCase().endsWith('.pdf')) {
        const buffer = fs.readFileSync(filePath)
        const data = await pdfParse(buffer)
        text = data.text
      } else if (file.toLowerCase().endsWith('.pptx') || file.toLowerCase().endsWith('.docx') || file.toLowerCase().endsWith('.xlsx')) {
        text = await parseOffice(filePath)
      } else if (file.toLowerCase().endsWith('.txt') || file.toLowerCase().endsWith('.md')) {
        text = fs.readFileSync(filePath, 'utf-8')
      } else {
        continue // skip unsupported files
      }
      if (text && text.trim().length > 10) {
        combined += `\n=== DOCUMENT: ${file} ===\n${text.trim()}\n`
        console.log(`  ✓ Loaded: ${file}`)
      }
    } catch (e) {
      console.error(`  ✗ Error reading ${file}:`, e.message)
    }
  }
  return combined
}

// ─── ASK ROUTE ───────────────────────────────────────────────────
app.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body
    if (!prompt) return res.status(400).json({ error: 'Prompt required' })

    const fullKnowledge = STATIC_KNOWLEDGE + (PRELOADED_DOCS ? `\n=== UPLOADED CERTIFICATION & RESUME DOCUMENTS ===\n${PRELOADED_DOCS}` : '')

    const systemPrompt = `You are Hirtheesh VJ's personal AI assistant embedded in his portfolio website.
Your job is to answer questions about Hirtheesh accurately and concisely based ONLY on the knowledge provided below.

RULES:
- ONLY use the knowledge base provided. Never invent or assume information not present.
- For certification questions, refer EXACTLY to the certifications in the knowledge base and documents.
- If you don't have a specific detail, say: "I don't have that detail — feel free to contact Hirtheesh directly!"
- Keep answers friendly, concise, and professional.
- Use bullet points for lists. Keep responses under 200 words unless the user asks for details.
- Refer to Hirtheesh in the third person (he/him).

KNOWLEDGE BASE:
${fullKnowledge}`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3,
      max_tokens: 512,
    })

    const answer = completion.choices[0]?.message?.content || "I'm having trouble thinking right now."
    res.json({ answer })

  } catch (error) {
    console.error('AI server error:', error)
    res.status(500).json({ error: 'AI server failure', message: error.message })
  }
})

// ─── HEALTH CHECK ────────────────────────────────────────────────
app.get('/health', (req, res) => {
  const docCount = fs.existsSync(DOCS_DIR) ? fs.readdirSync(DOCS_DIR).length : 0
  res.json({ status: 'online', documents_loaded: docCount })
})

// ─── START: load docs first, then listen ────────────────────────
const PORT = process.env.PORT || 3000

loadAllDocuments().then(docs => {
  PRELOADED_DOCS = docs
  app.listen(PORT, () => {
    console.log(`\n✅ AI backend running at http://localhost:${PORT}`)
    console.log(`📚 Knowledge base: ${PRELOADED_DOCS.length > 0 ? 'documents loaded ✓' : 'no documents found'}`)
  })
})
