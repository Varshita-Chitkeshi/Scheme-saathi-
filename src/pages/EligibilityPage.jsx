import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'
import EligibilityProgress from '../components/EligibilityProgress'
import Input from '../components/Input'
import Select from '../components/Select'
import { INCOME_RANGES, OCCUPATIONS, SOCIAL_CATEGORIES, STATES } from '../data/constants'
import { useAppData } from '../context/AppDataContext'
import { cn } from '../utils/helpers'

const STEPS = 6

function ChoiceCards({ name, value, onChange, options }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <label
          key={option}
          className={cn(
            'cursor-pointer rounded-2xl border px-4 py-4 text-sm font-semibold',
            value === option ? 'border-teal-600 bg-teal-50 text-teal-900' : 'border-slate-200 bg-white text-ink-700',
          )}
        >
          <input
            type="radio"
            className="sr-only"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  )
}

export default function EligibilityPage() {
  const { profile, saveEligibility } = useAppData()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    age: profile.age || '',
    state: profile.state || '',
    occupation: profile.occupation || '',
    annualIncome: profile.annualIncome || '',
    socialCategory: profile.socialCategory || '',
    areaType: profile.areaType || '',
    isStudent: profile.isStudent || '',
    isFarmer: profile.isFarmer || '',
    isEntrepreneur: profile.isEntrepreneur || '',
  })

  const set = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }))

  const canNext = useMemo(() => {
    if (step === 1) return Boolean(answers.age)
    if (step === 2) return Boolean(answers.state)
    if (step === 3) return Boolean(answers.occupation)
    if (step === 4) return Boolean(answers.annualIncome)
    if (step === 5) return Boolean(answers.socialCategory) && Boolean(answers.areaType)
    if (step === 6) return answers.isStudent && answers.isFarmer && answers.isEntrepreneur
    return false
  }, [step, answers])

  const finish = () => {
    saveEligibility(answers)
    navigate('/recommendations')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Let&apos;s find schemes that may match you.</h1>
        <p className="mt-2 text-ink-600">
          Short questions only. Results are possible matches — not official eligibility.
        </p>
      </div>
      <EligibilityProgress current={step} total={STEPS} />
      <Card className="min-h-[280px]">
        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl text-navy-900">What is your age?</h2>
            <div className="mt-4 max-w-xs">
              <Input
                id="q-age"
                label="Age in years"
                type="number"
                min="1"
                max="120"
                value={answers.age}
                onChange={(e) => set('age', e.target.value)}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl text-navy-900">Which state do you live in?</h2>
            <div className="mt-4">
              <Select
                id="q-state"
                label="State"
                value={answers.state}
                onChange={(e) => set('state', e.target.value)}
                options={STATES.filter((s) => s !== 'All India')}
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="mb-4 font-display text-2xl text-navy-900">What is your occupation?</h2>
            <ChoiceCards
              name="occupation"
              value={answers.occupation}
              onChange={(value) => set('occupation', value)}
              options={OCCUPATIONS}
            />
          </div>
        )}
        {step === 4 && (
          <div>
            <h2 className="mb-4 font-display text-2xl text-navy-900">What is your annual family income?</h2>
            <ChoiceCards
              name="income"
              value={answers.annualIncome}
              onChange={(value) => set('annualIncome', value)}
              options={INCOME_RANGES}
            />
          </div>
        )}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 font-display text-2xl text-navy-900">Do you belong to any applicable beneficiary category?</h2>
              <Select
                id="q-cat"
                label="Social category"
                value={answers.socialCategory}
                onChange={(e) => set('socialCategory', e.target.value)}
                options={SOCIAL_CATEGORIES}
              />
            </div>
            <div>
              <h3 className="mb-3 font-display text-xl text-navy-900">Do you live in a rural or urban area?</h3>
              <ChoiceCards
                name="area"
                value={answers.areaType}
                onChange={(value) => set('areaType', value)}
                options={['Rural', 'Urban']}
              />
            </div>
          </div>
        )}
        {step === 6 && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-navy-900">A few yes / no questions</h2>
            {[
              ['isStudent', 'Are you a student?'],
              ['isFarmer', 'Are you a farmer?'],
              ['isEntrepreneur', 'Are you self-employed or an entrepreneur?'],
            ].map(([key, label]) => (
              <div key={key}>
                <p className="mb-2 font-semibold text-ink-800">{label}</p>
                <ChoiceCards name={key} value={answers[key]} onChange={(value) => set(key, value)} options={['Yes', 'No']} />
              </div>
            ))}
          </div>
        )}
      </Card>
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
          Back
        </Button>
        {step < STEPS ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
            Next
          </Button>
        ) : (
          <Button onClick={finish} disabled={!canNext}>
            Find Matching Schemes
          </Button>
        )}
      </div>
    </div>
  )
}
