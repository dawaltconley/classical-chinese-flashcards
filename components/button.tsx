type ButtonStyle = 'default' | 'green' | 'red'
type Button = (props: {
  style?: ButtonStyle
  onClick: () => void
  children?: React.ReactNode
}) => JSX.Element

const getButtonClass = (style?: ButtonStyle) => {
  switch (style) {
    case 'green':
      return 'button--green'
    case 'red':
      return 'button--red'
    default:
      return ''
  }
}

const Button: Button = ({ style, onClick, children }) => (
  <button
    className={
      'button ' + getButtonClass(style) + ' rounded-full bg-gray-200 px-2 py-1'
    }
    onClick={() => onClick()}
  >
    {children}
  </button>
)

const ButtonCircle: Button = ({ style, onClick, children }) => (
  <button
    className={
      'button ' + getButtonClass(style) + ' aspect-square rounded-full p-2'
    }
    onClick={() => onClick()}
  >
    {children}
  </button>
)

export { Button, ButtonCircle }
