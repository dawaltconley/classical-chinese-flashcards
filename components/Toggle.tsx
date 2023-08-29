import type { ButtonStyle } from './Button'
import { useState, useEffect, useRef } from 'react'

const Toggle = ({
  name,
  text,
  onToggle,
  watchState = false,
}: {
  name: string
  text: string
  onToggle: (state: boolean) => void
  style?: ButtonStyle
  watchState?: boolean
}) => {
  const checkbox = useRef<HTMLInputElement>(null)
  const [isOn, setIsOn] = useState(watchState)

  useEffect(() => {
    setIsOn(watchState)
    if (checkbox.current) checkbox.current.checked = watchState
  }, [watchState])

  return (
    <label
      className={`button ${isOn ? 'button--active' : ''}
        relative inline-block cursor-pointer rounded-full
        px-3 py-2 leading-none duration-150`}
    >
      {text}
      <input
        ref={checkbox}
        className="absolute h-0 w-0 opacity-0"
        type="checkbox"
        defaultChecked={watchState}
        onChange={event => {
          let state = event.target.checked
          setIsOn(state)
          onToggle(state)
        }}
        name={name}
      />
    </label>
  )
}

export default Toggle
