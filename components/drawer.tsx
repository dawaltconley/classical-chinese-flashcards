import { useState, useEffect, useCallback, useRef, CSSProperties } from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import Draggable, { DraggableEventHandler } from 'react-draggable'
import { Toggle } from './button'

interface DrawerProperties extends CSSProperties {
  '--handle-height'?: string
  '--background-color'?: string
}

const Drawer = ({
  title,
  isOpen,
  setIsOpen,
  children,
}: {
  title?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children?: React.ReactNode
}) => {
  const drawer = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)

  const [handleHeight, setHandleHeight] = useState(0)
  const [drawerHeight, setDrawerHeight] = useState(0)
  const [boundsTop, setBoundsTop] = useState(0)
  const [isBeingDragged, setIsBeingDragged] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(!isOpen)

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
    setHandleHeight(handle.current?.clientHeight || 0)
    setDrawerHeight(body.current?.clientHeight || 0)
    setBoundsTop((body.current?.clientHeight || 0) * -1)
  }, [handle, body])

  useEffect(() => {
    updateDrawerBounds()
  }, [updateDrawerBounds])

  useResizeObserver(drawer, () => updateDrawerBounds())

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
          transitionTimingFunction: 'ease-out',
          ...({
            '--handle-height': handleHeight ? handleHeight + 'px' : null,
          } as DrawerProperties),
        }}
      >
        <div ref={handle} className="drawer__handle">
          {title ? (
            <Toggle
              name="test"
              text={title}
              onToggle={() => toggle()}
              watchState={isOpen}
            />
          ) : null}
        </div>
        <div ref={body} className="drawer__body">
          {children}
        </div>
      </div>
    </Draggable>
  )
}

export default Drawer
