import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import Button from './Button'
import LanguageSelector from './LanguageSelector'
import { LogoMark } from './HeroIllustration'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold ${
    isActive ? 'bg-navy-50 text-navy-800' : 'text-ink-700 hover:bg-slate-50'
  }`

export default function Navbar() {
  const { t } = useLanguage()
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const onLogout = () => {
    logout()
    close()
    navigate('/')
  }

  const links = (
    <>
      <NavLink to="/" end className={linkClass} onClick={close}>
        {t.nav.home}
      </NavLink>
      <NavLink to="/schemes" className={linkClass} onClick={close}>
        {t.nav.explore}
      </NavLink>
      <NavLink to={isAuthenticated ? '/eligibility' : '/login'} className={linkClass} onClick={close}>
        {t.nav.find}
      </NavLink>
      <NavLink to={isAuthenticated ? '/assistant' : '/login'} className={linkClass} onClick={close}>
        {t.nav.assistant}
      </NavLink>
      {isAuthenticated && (
        <>
          <NavLink to="/dashboard" className={linkClass} onClick={close}>
            {t.nav.dashboard}
          </NavLink>
          <NavLink to="/profile" className={linkClass} onClick={close}>
            {t.nav.profile}
          </NavLink>
        </>
      )}
    </>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <LogoMark />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSelector compact />
          {isAuthenticated ? (
            <>
              <span className="max-w-[10rem] truncate text-sm text-ink-600">{user.fullName}</span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                {t.nav.logout}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-navy-800">
                {t.nav.login}
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-900"
              >
                {t.nav.register}
              </Link>
            </>
          )}
        </div>
        <button
          type="button"
          className="rounded-lg p-2 lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {links}
          </nav>
          <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3">
            <LanguageSelector />
            {isAuthenticated ? (
              <Button variant="outline" onClick={onLogout}>
                {t.nav.logout}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" onClick={close} className="flex-1">
                  <Button variant="outline" className="w-full">
                    {t.nav.login}
                  </Button>
                </Link>
                <Link to="/register" onClick={close} className="flex-1">
                  <Button className="w-full">{t.nav.register}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
