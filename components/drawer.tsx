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
  const [drawerTop, setDrawerTop] = useState(0)
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
    const handleHeight = handle.current?.clientHeight || 0
    const bodyHeight = body.current?.clientHeight || 0

    setHandleHeight(handleHeight)
    setDrawerHeight(bodyHeight)
    setBoundsTop(bodyHeight * -1)
    setDrawerTop(document.documentElement.clientHeight - handleHeight)
  }, [handle, body])

  useEffect(() => {
    updateDrawerBounds()
  }, [updateDrawerBounds])

  useResizeObserver(drawer, () => updateDrawerBounds())

  return (
    <>
      <div
        className={`drawer__lightbox
          ${isOpen ? 'drawer__lightbox--active' : ''}`}
        style={{
          transitionDuration: '500ms',
          pointerEvents: isOpen ? undefined : 'none',
        }}
        onClick={() => close()}
      ></div>
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
            top: drawerTop ? drawerTop + 'px' : undefined,
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
    </>
  )
}

export default Drawer
