require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const schemeRoutes = require('./routes/schemeRoutes')
const recommendationRoutes = require('./routes/recommendationRoutes')
const savedSchemeRoutes = require('./routes/savedSchemeRoutes')
const checklistRoutes = require('./routes/checklistRoutes')
const aiRoutes = require('./routes/aiRoutes')

const app = express()

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(
  cors({
    origin: [frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Scheme Saathi API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/schemes', schemeRoutes)
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/saved-schemes', savedSchemeRoutes)
app.use('/api/checklist', checklistRoutes)
app.use('/api/ai', aiRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  })
