'use client'
import { useEffect, useState } from 'react'
import DesktopLogin from './DesktopLogin'
import MobileLogin  from './MobileLogin'

export default function Login() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)')
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile ? <MobileLogin /> : <DesktopLogin />
}
