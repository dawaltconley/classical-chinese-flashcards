import { useState, useEffect, useCallback } from 'react'
import { Button, Toggle } from './button'
import { Word } from '../data/wordlist'

type FilterMap = {
  [item: string]: boolean
}

const mapFromItems = (options: string[], include?: string[]) => {
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

type WordFilter = Pick<
  {
    [Attribute in keyof Word]: string[]
  },
  'lesson' | 'type'
>

const getOptionsFromAttr = (items: Word[], attr: keyof Word): string[] => {
  let options: string[] = []
  for (let item of items) {
    let value = item[attr]?.toString()
    if (value && !options.some(opt => opt == value)) {
      options.push(value)
    }
  }
  return options
}

const filterWords = (words: Word[], filters: WordFilter): Word[] =>
  words.filter(word => {
    for (let str in filters) {
      let attr = str as keyof WordFilter
      let valid = filters[attr]
      let value = word[attr]?.toString()
      if (value === undefined) return false
      if (!valid?.some(v => v == value)) return false
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
  const [options, setOptions] = useState<WordFilter>({
    lesson: getOptionsFromAttr(words, 'lesson'),
    type: getOptionsFromAttr(words, 'type'),
  })
  const [filters, setFilters] = useState(options)

  const handleFilter = (attr: string, filtered: string[]) => {
    setFilters(filters => ({
      ...filters,
      [attr]: filtered,
    }))
  }

  const saveFilters = () => onFilter(filterWords(words, filters))

  // TODO this really should never change
  useEffect(() => {
    setOptions({
      lesson: getOptionsFromAttr(words, 'lesson'),
      type: getOptionsFromAttr(words, 'type'),
    })
  }, [words])

  return (
    <div>
      <FilterList
        name="Lessons"
        options={options.lesson}
        onFilter={useCallback(
          filtered => handleFilter('lessons', filtered),
          []
        )}
      />
      <FilterList
        name="Types"
        options={options.type}
        onFilter={useCallback(filtered => handleFilter('types', filtered), [])}
      />
      <Button onClick={saveFilters}>Apply</Button>
    </div>
  )
}

export default Settings
