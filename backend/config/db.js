const mongoose = require('mongoose')

async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri || uri.includes('your_mongodb_atlas_connection_string')) {
    throw new Error('Set MONGO_URI in backend/.env to your MongoDB Atlas connection string')
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('MongoDB connected')
}

module.exports = connectDB
