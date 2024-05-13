import type { ComponentPropsWithoutRef } from 'react'
import { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import '../styles/sass/flip-transition.scss'

export interface FlipTransitionProps extends ComponentPropsWithoutRef<'div'> {
  watch?: boolean
  duration: number
  width?: number
  height?: number
  children: JSX.Element
}

export default function FlipTransition({
  watch = true,
  duration,
  children,
  width,
  height,
  className,
  style,
  ...props
}: FlipTransitionProps) {
  const container = useRef<HTMLDivElement>(null)

  const [current, setCurrent] = useState(children)
  const [last, setLast] = useState<typeof children>()
  const [trigger, setTrigger] = useState(true)

  console.log(children)
  if (watch && !areEqual(children, current)) {
    setLast(current)
    setCurrent(children)
    setTrigger(t => !t)
  }

  return (
    <CSSTransition
      nodeRef={container}
      in={trigger}
      timeout={duration}
      classNames="flip"
    >
      <div
        ref={container}
        className={clsx('flip relative', className)}
        style={{
          transitionDuration: duration + 'ms',
          width: width ? `${width}px` : undefined,
          height: height ? `${height}px` : undefined,
          ...style,
        }}
        {...props}
      >
        {current}
        {last}
      </div>
    </CSSTransition>
  )
}

const areEqual = (e1: JSX.Element, e2: JSX.Element): boolean =>
  e1 === e2 ||
  (e1?.key && e1.key === e2?.key) ||
  (e1?.props?.id && e1.props.id === e2?.props?.id)
