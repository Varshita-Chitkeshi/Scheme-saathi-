import axios from 'axios'
import { mockSchemes } from '../data/mockSchemes'
import { generateMockAiReply, rankSchemes } from '../utils/helpers'

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('scheme-saathi-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

/** Placeholder services — mock implementations until the Express backend is connected. */

export async function login(_payload) {
  await delay()
  return { data: { mock: true, message: 'Connect POST /api/auth/login' } }
}

export async function register(_payload) {
  await delay()
  return { data: { mock: true, message: 'Connect POST /api/auth/register' } }
}

export async function getProfile() {
  await delay()
  return { data: { mock: true, message: 'Connect GET /api/profile' } }
}

export async function updateProfile(_payload) {
  await delay()
  return { data: { mock: true, message: 'Connect PUT /api/profile' } }
}

export async function getSchemes(params = {}) {
  await delay(200)
  let results = [...mockSchemes]
  if (params.search) {
    const q = params.search.toLowerCase()
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q),
    )
  }
  if (params.category) results = results.filter((s) => s.category === params.category)
  if (params.state && params.state !== 'All India') {
    results = results.filter((s) => s.state === 'All India' || s.state === params.state)
  }
  return { data: results }
}

export async function getSchemeById(id) {
  await delay(150)
  const scheme = mockSchemes.find((s) => s.id === id)
  if (!scheme) {
    const error = new Error('Scheme not found')
    error.status = 404
    throw error
  }
  return { data: scheme }
}

export async function recommendSchemes(payload = {}) {
  await delay(250)
  const ranked = rankSchemes(mockSchemes, payload.answers, payload.profile)
  return { data: ranked }
}

export async function saveScheme(_schemeId) {
  await delay()
  return { data: { mock: true, message: 'Connect POST /api/schemes/save' } }
}

export async function getSavedSchemes() {
  await delay()
  return { data: { mock: true, message: 'Connect GET /api/schemes/saved' } }
}

export async function sendAIMessage(payload) {
  await delay(500)
  // Later: return api.post('/ai/chat', payload)
  const reply = generateMockAiReply({
    message: payload.message,
    schemes: mockSchemes,
    language: payload.language,
    focusedScheme: payload.scheme || null,
  })
  return { data: { reply, source: 'mock' } }
}
