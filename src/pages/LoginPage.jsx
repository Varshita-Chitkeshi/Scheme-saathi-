import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import Modal from '../components/Modal'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export default function LoginPage() {
  const { login, continueAsGuest, error, setError } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [forgotOpen, setForgotOpen] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    const result = await login({ email, password })
    if (result.ok) navigate(from, { replace: true })
  }

  const onGuest = () => {
    continueAsGuest()
    navigate(from, { replace: true })
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <h1 className="font-display text-3xl text-navy-900">Login</h1>
        <p className="mt-2 text-sm text-ink-600">Use your Scheme Saathi account, or continue as a guest.</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            required
          />
          {error && (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={onGuest}>
            {t.common.guest}
          </Button>
        </form>
        <div className="mt-4 flex flex-col gap-2 text-sm">
          <button type="button" className="text-left font-medium text-teal-700 hover:underline" onClick={() => setForgotOpen(true)}>
            Forgot password
          </button>
          <p>
            New here?{' '}
            <Link to="/register" className="font-semibold text-navy-800 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </Card>
      <Modal open={forgotOpen} title="Password reset" onClose={() => setForgotOpen(false)}>
        <p className="text-sm text-ink-600">
          Email reset will be available when the backend is connected. For this demo, create a new mock account or continue
          as a guest. Passwords are never stored in the browser.
        </p>
        <Button className="mt-4" onClick={() => setForgotOpen(false)}>
          Close
        </Button>
      </Modal>
    </div>
  )
}
