import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import Select from '../components/Select'
import { STATES } from '../data/constants'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register, error, setError } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
  })

  const set = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
    setError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const result = await register(form)
    if (result.ok) navigate('/dashboard', { replace: true })
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <h1 className="font-display text-3xl text-navy-900">Create account</h1>
        <p className="mt-2 text-sm text-ink-600">Registration is mocked on the frontend. Your password is not saved.</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input id="fullName" label="Full Name" value={form.fullName} onChange={set('fullName')} required />
          <Input id="reg-email" label="Email" type="email" value={form.email} onChange={set('email')} required />
          <Input
            id="reg-password"
            label="Password"
            type="password"
            value={form.password}
            onChange={set('password')}
            hint="At least 6 characters"
            required
          />
          <Input
            id="confirm"
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={set('confirmPassword')}
            required
          />
          <Select
            id="state"
            label="State (optional)"
            value={form.state}
            onChange={set('state')}
            options={STATES.filter((s) => s !== 'All India')}
            placeholder="Select state"
          />
          {error && (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-navy-800 hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  )
}
