import type { ComponentPropsWithoutRef } from 'react'
import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import clsx from 'clsx'
import '../styles/sass/flip-transition.scss'

export interface FlipTransitionProps extends ComponentPropsWithoutRef<'div'> {
  duration: number
  width?: number
  height?: number
  children: JSX.Element
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
