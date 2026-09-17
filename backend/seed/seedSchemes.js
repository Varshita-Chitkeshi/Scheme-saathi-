require('dotenv').config()
const mongoose = require('mongoose')
const Scheme = require('../models/Scheme')
const { schemes } = require('./schemeData')

async function seed() {
  const uri = process.env.MONGO_URI
  if (!uri || uri.includes('your_mongodb_atlas_connection_string')) {
    throw new Error('Set MONGO_URI in backend/.env before seeding')
  }

  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  for (const item of schemes) {
    await Scheme.findOneAndUpdate({ slug: item.slug }, item, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    })
    console.log(`Upserted: ${item.slug}`)
  }

  console.log(`Seed complete. ${schemes.length} schemes in directory.`)
  await mongoose.disconnect()
}

seed().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
