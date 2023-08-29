export interface ToggleProps {
  name: string
  text: string
  state: boolean
  onToggle?: (state: boolean) => void
  onChange?: (state: boolean) => void
}

const Toggle = ({
  name,
  text,
  state = false,
  onToggle,
  onChange,
}: ToggleProps) => (
  <label
    className={`button ${state ? 'button--active' : ''}
        relative inline-block cursor-pointer rounded-full
        px-3 py-2 leading-none duration-150`}
  >
    {text}
    <input
      className="absolute h-0 w-0 opacity-0"
      type="checkbox"
      checked={state}
      onClick={e => {
        e.preventDefault()
        onToggle && onToggle(!state)
      }}
      onChange={event => {
        if (onChange) {
          onChange(event.target.checked)
        }
      }}
      name={name}
    />
  </label>
)

export default Toggle
