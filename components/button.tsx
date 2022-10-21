type Button = (props: {
  onClick: () => void
  children?: React.ReactNode
}) => JSX.Element

const Button: Button = ({ onClick, children }) => {
  return (
    <button
      className="rounded-full bg-gray-200 px-2 py-1"
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}
const ButtonCircle: Button = ({ onClick, children }) => {
  return (
    <button
      className="aspect-square rounded-full bg-gray-200 p-2"
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}

export { Button, ButtonCircle }
