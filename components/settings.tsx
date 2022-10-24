import { useState, useEffect, useCallback, useRef } from 'react'
import { Toggle } from './button'
import wordlist, { Word } from '../data/wordlist'

// interface FilterProps<T> {
//
// }

type FilterMap = {
  [item: string]: boolean
}

const mapFromItems = (options: string[], include?: string[]): FilterMap => {
  const f: FilterMap = {}
  for (let option of options) {
    if (!include || include.includes(option)) f[option] = true
    else f[option] = false
  }
  return f
}

const itemsFromMap = (map: FilterMap): string[] =>
  Object.entries(map)
    .filter(([, state]) => state)
    .map(([item]) => item)

const FilterList = ({
  name,
  options,
  include,
  onFilter,
}: {
  name: string
  options: string[]
  include?: typeof options[number][]
  onFilter: (options: string[]) => void
}) => {
  const [filtered, setFiltered] = useState<FilterMap>(
    mapFromItems(options, include)
  )

  const handleToggle = (item: string, state: boolean) => {
    setFiltered(filtered => ({
      ...filtered,
      [item]: state,
    }))
  }

  useEffect(() => {
    setFiltered(mapFromItems(options, include))
  }, [options, include])

  useEffect(() => {
    onFilter(itemsFromMap(filtered))
  }, [filtered, onFilter])

  return (
    <fieldset>
      <legend>{name}</legend>
      {options.map(option => (
        <Toggle
          key={`${name} filter ${option}`}
          name={`${name} filter ${option}`}
          text={option}
          onToggle={state => handleToggle(option, state)}
          initialState={include?.includes(option) || true}
        />
      ))}
    </fieldset>
  )
}

var getOptionsFromAttr = (items: Word[], attr: keyof Word): string[] => {
  let options: string[] = []
  for (let item of items) {
    let value = item[attr]?.toString()
    if (value && !options.some(opt => opt === value)) options.push(value)
  }
  return options
}

interface SettingsProps<T> {
  items: T[]
  attributes: (keyof T)[]
  onFilter: (filtered: T[]) => void
}

const filterWords = (
  words: Word[],
  filters: Record<keyof Word, string[]>
): Word[] =>
  words.filter(word => {
    for (let str in filters) {
      let attr = str as keyof Word
      let valid = filters[attr]
      let value = word[attr]?.toString()
      if (!value || !valid.includes(value)) return false
    }
    return true
  })

const Settings = ({
  words,
  onFilter,
}: {
  words: Word[]
  onFilter: (filtered: Word[]) => void
}) => {
  // const [lessons, setLessons] = useState(getOptionsFromAttr(words, 'lesson'))
  // const [type, setType] = useState(getOptionsFromAttr(words, 'type'))
  const [options, setOptions] = useState({
    lessons: getOptionsFromAttr(words, 'lesson'),
    types: getOptionsFromAttr(words, 'type'),
  })
  const [filters, setFilters] = useState(options)

  const handleFilter = (attr: string, filtered: string[]) => {
    setFilters(filters => ({
      ...filters,
      [attr]: filtered,
    }))
  }

  const saveFilters = () => onFilter(filterWords(words, filters))

  useEffect(() => {
    setOptions({
      lessons: getOptionsFromAttr(words, 'lesson'),
      types: getOptionsFromAttr(words, 'type'),
    })
  }, [words])

  return (
    <div>
      <FilterList
        name="Lessons"
        options={options.lessons}
        onFilter={filtered => handleFilter('lessons', filtered)}
      />
      <FilterList
        name="Types"
        options={options.types}
        onFilter={filtered => handleFilter('types', filtered)}
      />
    </div>
  )
}
