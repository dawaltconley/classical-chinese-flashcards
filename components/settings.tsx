import { useState, useEffect, useCallback, useRef } from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import Draggable from 'react-draggable'
import { Button, ButtonCircle } from './button'

const FilterSelect = () => {
  return <main></main>
}

// const dragListener = ()

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const drawer = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [drawerHeight, setDrawerHeight] = useState(0)
  const [boundsTop, setBoundsTop] = useState(0)
  const [defaultY, setDefaultY] = useState(0)

  const open = () => {
    setIsOpen(true)
    setDefaultY(-drawerHeight)
  }

  const close = () => {
    setIsOpen(false)
    setDefaultY(0)
  }

  const onStop = () => {
    if (!drawer.current) return
    let { top } = drawer.current.getBoundingClientRect()
    console.log(top)

    if (top < window.innerHeight * 0.8) open()
    else close()
  }

  console.log({ defaultY })

  const updateDrawerBounds = useCallback(() => {
    setDrawerHeight(body.current?.clientHeight || 0)
    setBoundsTop((body.current?.clientHeight || 0) * -1)
  }, [body])

  useEffect(() => {
    updateDrawerBounds()
  }, [updateDrawerBounds])

  useResizeObserver(body.current, () => updateDrawerBounds)

  return (
    <Draggable
      axis="y"
      bounds={{ top: boundsTop, bottom: 0 }}
      handle=".drawer__handle"
      onStop={onStop}
      position={{ x: 0, y: defaultY }}
    >
      <div ref={drawer} className="drawer">
        <div ref={handle} className="drawer__handle rounded-t-2xl bg-pink-200">
          Filters
        </div>
        <div ref={body} className="drawer__body bg-pink-200"></div>
      </div>
    </Draggable>
  )
}

export { Drawer }
