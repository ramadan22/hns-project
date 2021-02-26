import { useLocation, useEffect } from '../libraries'

export const ScrollTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}