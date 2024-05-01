import { Dispatch, SetStateAction, useState, useEffect } from 'react'

export default function useStickyState<S>(
  defaultValue: S,
  key: string,
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    if (typeof window !== 'undefined') {
      const stickyValue = window.localStorage.getItem(key)

      if (!stickyValue) return defaultValue

      return JSON.parse(stickyValue)
    }

    return defaultValue
  })

  useEffect(() => {
    if (!value) {
      window.localStorage.removeItem(key)

      return
    }

    const val = JSON.stringify(value)

    window.localStorage.setItem(
      key,
      val
    )
  }, [key, value])

  return [value, setValue]
}
