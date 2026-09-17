import { useEffect, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import Select from '../components/Select'
import { GENDERS, INCOME_RANGES, OCCUPATIONS, SOCIAL_CATEGORIES, STATES } from '../data/constants'
import { useAppData } from '../context/AppDataContext'
import { getProfileCompletion } from '../utils/helpers'

export default function ProfilePage() {
  const { profile, saveProfile } = useAppData()
  const [form, setForm] = useState(profile)
  const [saved, setSaved] = useState(false)
  const completion = getProfileCompletion(form)

  useEffect(() => {
    setForm(profile)
  }, [profile])

  const set = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
    setSaved(false)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    saveProfile(form)
    setSaved(true)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl text-navy-900">Citizen Profile</h1>
        <p className="mt-1 text-ink-600">We only ask what helps match public schemes. Sensitive extras are optional.</p>
      </div>
      <Card>
        <p className="text-sm font-semibold text-teal-800">Profile completion: {completion}%</p>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full bg-teal-600" style={{ width: `${completion}%` }} />
        </div>
      </Card>
      <Card>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={onSubmit}>
          <Input id="p-name" label="Full Name" value={form.fullName} onChange={set('fullName')} />
          <Input id="p-age" label="Age" type="number" min="1" max="120" value={form.age} onChange={set('age')} />
          <Select id="p-gender" label="Gender" value={form.gender} onChange={set('gender')} options={GENDERS} />
          <Select
            id="p-state"
            label="State"
            value={form.state}
            onChange={set('state')}
            options={STATES.filter((s) => s !== 'All India')}
          />
          <Input id="p-district" label="District" value={form.district} onChange={set('district')} />
          <Select id="p-occ" label="Occupation" value={form.occupation} onChange={set('occupation')} options={OCCUPATIONS} />
          <Select
            id="p-income"
            label="Annual Family Income"
            value={form.annualIncome}
            onChange={set('annualIncome')}
            options={INCOME_RANGES}
          />
          <Select
            id="p-social"
            label="Social Category"
            value={form.socialCategory}
            onChange={set('socialCategory')}
            options={SOCIAL_CATEGORIES}
          />
          <Select
            id="p-area"
            label="Rural / Urban"
            value={form.areaType}
            onChange={set('areaType')}
            options={['Rural', 'Urban']}
          />
          <Select
            id="p-dis"
            label="Disability status"
            value={form.disabilityStatus}
            onChange={set('disabilityStatus')}
            options={['No', 'Yes', 'Prefer not to say']}
          />
          <Select id="p-stu" label="Student status" value={form.isStudent} onChange={set('isStudent')} options={['Yes', 'No']} />
          <Select id="p-farm" label="Farmer status" value={form.isFarmer} onChange={set('isFarmer')} options={['Yes', 'No']} />
          <Select
            id="p-ent"
            label="Entrepreneur / Self-employed status"
            value={form.isEntrepreneur}
            onChange={set('isEntrepreneur')}
            options={['Yes', 'No']}
          />
          <div className="sm:col-span-2 flex flex-wrap gap-3">
            <Button type="submit">{completion < 100 ? 'Save Profile' : 'Update Profile'}</Button>
            {saved && (
              <p className="self-center text-sm font-medium text-teal-800" role="status">
                Profile saved on this device.
              </p>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
