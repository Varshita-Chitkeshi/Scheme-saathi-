const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const recentlyViewedSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    viewedAt: { type: Date, default: Date.now },
  },
  { _id: false },
)

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    age: { type: String, default: '' },
    gender: { type: String, default: '' },
    state: { type: String, default: '' },
    district: { type: String, default: '' },
    occupation: { type: String, default: '' },
    employmentType: { type: String, default: '' },
    annualIncome: { type: String, default: '' },
    annualIncomeRange: { type: String, default: '' },
    socialCategory: { type: String, default: '' },
    areaType: { type: String, default: '' },
    disabilityStatus: { type: String, default: '' },
    isStudent: { type: String, default: '' },
    isFarmer: { type: String, default: '' },
    isEntrepreneur: { type: String, default: '' },
    savedSchemes: { type: [String], default: [] },
    recentlyViewedSchemes: { type: [recentlyViewedSchema], default: [] },
    lastQuestionnaire: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
)

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.methods.matchPassword = function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id.toString(),
    email: this.email,
    fullName: this.fullName,
    name: this.fullName,
    state: this.state || '',
    isGuest: false,
  }
}

userSchema.methods.toProfileJSON = function toProfileJSON() {
  return {
    fullName: this.fullName || '',
    age: this.age || '',
    gender: this.gender || '',
    state: this.state || '',
    district: this.district || '',
    occupation: this.occupation || '',
    employmentType: this.employmentType || this.occupation || '',
    annualIncome: this.annualIncome || this.annualIncomeRange || '',
    annualIncomeRange: this.annualIncomeRange || this.annualIncome || '',
    socialCategory: this.socialCategory || '',
    areaType: this.areaType || '',
    disabilityStatus: this.disabilityStatus || '',
    isStudent: this.isStudent || '',
    isFarmer: this.isFarmer || '',
    isEntrepreneur: this.isEntrepreneur || '',
  }
}

module.exports = mongoose.model('User', userSchema)
