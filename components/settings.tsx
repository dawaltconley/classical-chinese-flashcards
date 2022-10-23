import { useState, useEffect, useCallback, useRef } from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import Draggable, { DraggableEventHandler } from 'react-draggable'
import { Button, ButtonCircle } from './button'

const FilterSelect = () => {
  return <main></main>
}

// const dragListener = ()

// TODO handle cases where the drawer contents are bigger than the window and need to scroll
const Drawer = ({ children }: { children: React.ReactNode }) => {
  const drawer = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [drawerHeight, setDrawerHeight] = useState(0)
  const [boundsTop, setBoundsTop] = useState(0)
  const [defaultY, setDefaultY] = useState(0)
  const [isBeingDragged, setIsBeingDragged] = useState(false)

  const open = () => {
    setIsOpen(true)
    setDefaultY(-drawerHeight)
  }

  const close = () => {
    setIsOpen(false)
    setDefaultY(0)
  }

  const onStart: DraggableEventHandler = () => {
    setIsBeingDragged(true)
  }

  const onStop: DraggableEventHandler = (_event, { y, deltaY }) => {
    setIsBeingDragged(false)
    let threshold = Math.min(120, window.innerHeight / 5)
    if (deltaY) {
      // handle flick
      if (deltaY < 0) open()
      else if (deltaY > 0) close()
    } else if (isOpen) {
      // position threshold to trigger close
      if (-y < drawerHeight - threshold) close()
      else open()
    } else {
      // position threshold to trigger open if closed
      if (-y > threshold) open()
      else close()
    }
  }

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
      onStart={onStart}
      onStop={onStop}
      position={{ x: 0, y: isOpen ? -drawerHeight : 0 }}
    >
      <div
        ref={drawer}
        className="drawer"
        style={{
          transitionDuration: isBeingDragged ? '0s' : '500ms',
          transitionProperty: 'transform',
        }}
      >
        <div ref={handle} className="drawer__handle rounded-t-2xl bg-pink-200">
          Filters
        </div>
        <div ref={body} className="drawer__body bg-pink-200"></div>
      </div>
    </Draggable>
  )
}

export { Drawer }
