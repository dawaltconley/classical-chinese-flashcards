import { useState, useEffect, useCallback, useRef, CSSProperties } from 'react'
import Draggable, { DraggableEventHandler } from 'react-draggable'
import Toggle from './Toggle'

interface DrawerCSSProperties extends CSSProperties {
  '--handle-height'?: string
  '--background-color'?: string
}

interface DrawerProps {
  title?: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  transitionDuration?: number
  children?: React.ReactNode
}

const Drawer = ({
  title,
  isOpen,
  setIsOpen,
  transitionDuration = 500,
  children,
}: DrawerProps) => {
  const drawer = useRef<HTMLDivElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)

  const [handleHeight, setHandleHeight] = useState(0)
  const [drawerHeight, setDrawerHeight] = useState(0)
  const [boundsTop, setBoundsTop] = useState(0)
  const [drawerBottom, setDrawerBottom] = useState(0)
  const [isBeingDragged, setIsBeingDragged] = useState(false)

  const drawerTransition = transitionDuration + 'ms'

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
    setDrawerBottom(bodyHeight * -1)
  }, [handle, body])

  useEffect(() => {
    updateDrawerBounds()
    window.addEventListener('resize', updateDrawerBounds)
    return () => window.removeEventListener('resize', updateDrawerBounds)
  }, [updateDrawerBounds])

  return (
    <>
      <div
        className={`drawer__lightbox
          ${isOpen ? 'drawer__lightbox--active' : ''}`}
        style={{
          transitionDuration: drawerTransition,
          pointerEvents: isOpen ? undefined : 'none',
        }}
        onClick={() => close()}
      ></div>
      <Draggable
        nodeRef={drawer}
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
            top: drawerBottom ? 'auto' : '100%',
            bottom: drawerBottom ? drawerBottom + 'px' : undefined,
            transitionDuration: isBeingDragged ? '0s' : drawerTransition,
            transitionProperty: 'transform',
            transitionTimingFunction: 'ease-out',
            ...({
              '--handle-height': handleHeight ? handleHeight + 'px' : null,
            } as DrawerCSSProperties),
          }}
        >
          <div ref={handle} className="drawer__handle">
            {title ? (
              <Toggle
                name="test"
                text={title}
                state={isOpen}
                onToggle={() => toggle()}
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
