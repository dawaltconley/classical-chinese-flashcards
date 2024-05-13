import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { useState, useRef, forwardRef, Ref } from 'react'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import '../styles/sass/flip-transition.scss'

// export interface FlipTransitionProps extends ComponentPropsWithoutRef<'div'> {
//   duration: number
//   width?: number
//   height?: number
//   children: React.ReactNode
// }

export type FlipTransitionProps<T extends ElementType = 'div'> =
  ComponentPropsWithoutRef<T> & {
    as?: T
    duration: number
    unmount?: boolean
    width?: number
    height?: number
    children: React.ReactNode
  }

export default forwardRef(function FlipTransition<T extends ElementType>(
  {
    as,
    duration,
    unmount = true,
    children,
    width,
    height,
    className,
    style,
    ...props
  }: FlipTransitionProps<T>,
  ref: Ref<T> | null
) {
  const [current, setCurrent] = useState(children)
  const [last, setLast] = useState<typeof children>()
  const [trigger, setTrigger] = useState(true)

  if (children !== current) {
    setLast(current)
    setCurrent(children)
    setTrigger(t => !t)
  }

  const Wrapper = as || 'div'

  return (
    <Wrapper
      ref={ref}
      {...(Wrapper === 'button' ? { type: 'button' } : {})}
      className={clsx('context-3d relative', className)}
      style={{
        transitionDuration: duration + 'ms',
        width: width ? width + 'px' : null,
        height: height ? height + 'px' : null,
        ...style,
      }}
      {...props}
    >
      <Transition
        key={(!trigger).toString()}
        show={false}
        as="div"
        unmount={unmount}
        className="flip"
        enter="transition-transform transform-gpu duration-[inherit]"
        enterFrom="flip--in"
        leave="transition-transform transform-gpu duration-[inherit]"
        leaveTo="flip--out"
      >
        {last}
      </Transition>
      <Transition
        key={trigger.toString()}
        show={true}
        as="div"
        unmount={unmount}
        className="flip"
        enter="transition-transform transform-gpu duration-[inherit]"
        enterFrom="flip--in"
        leave="transition-transform transform-gpu duration-[inherit]"
        leaveTo="flip--out"
      >
        {current}
      </Transition>
    </Wrapper>
  )
})
