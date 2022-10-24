import { useState, useEffect, useCallback, useRef } from 'react'
import { Toggle } from './button'

const FilterList = ({
  name,
  items,
  onFilter,
  active,
  children,
}: {
  name: string
  items: string[]
  onFilter: (items: string[]) => void
  active?: typeof items[number]
  children?: React.ReactNode
}) => {
  const [filtered, setFiltered] = useState(active || items)

  return (
    <fieldset>
      <legend>{name}</legend>
      {/* items.map(item => (
        <Toggle
          name={`${name} filter ${item}`}
          text={item}
          onToggle={}
          initialState={active?.includes(item) || true}
        />
        )) */}
    </fieldset>
  )
}
