import type { ComponentPropsWithoutRef } from 'react'
import { useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import '../styles/sass/flip-transition.scss'

export interface FlipTransitionProps extends ComponentPropsWithoutRef<'div'> {
  duration: number
  width?: number
  height?: number
  children: React.ReactNode
}

export default function FlipTransition({
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

  if (children !== current) {
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
          width: width + 'px',
          height: height + 'px',
          ...style,
        }}
        {...props}
      >
        <div key="front" className="flippable__front absolute inset-0">
          {current}
        </div>
        <div key="back" className="flippable__back absolute inset-0">
          {last}
        </div>
      </div>
    </CSSTransition>
  )
}
