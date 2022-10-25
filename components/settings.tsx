import { useState, useEffect } from 'react'
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
    const newFilters = {
      ...filtered,
      [item]: state,
    }
    setFiltered(newFilters)
    onFilter(itemsFromMap(newFilters))
  }

  const selectAll = () => {
    setFiltered(mapFromItems(options))
    onFilter(options)
  }

  const selectNone = () => {
    setFiltered(mapFromItems(options, []))
    onFilter([])
  }

  useEffect(() => {
    setFiltered(mapFromItems(options, include))
  }, [options, include])

  return (
    <fieldset>
      <legend>{name}</legend>
      <div className="button-list">
        <Toggle
          name={`${name} filter all`}
          text="Select all"
          onToggle={state => (state ? selectAll() : selectNone())}
          watchState={Object.values(filtered).every(Boolean)}
        />
        {options.map(option => (
          <Toggle
            key={`${name} filter ${option}`}
            name={`${name} filter ${option}`}
            text={option}
            onToggle={state => handleToggle(option, state)}
            watchState={filtered[option]}
          />
        ))}
      </div>
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

const getFilterFromWords = (words: Word[]): WordFilter => ({
  lesson: getOptionsFromAttr(words, 'lesson'),
  type: getOptionsFromAttr(words, 'type'),
})

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
  const [options, setOptions] = useState(getFilterFromWords(words))
  const [filters, setFilters] = useState(options)
  const [error, setError] = useState<boolean | string>(false)

  const handleFilter = (attr: keyof Word, filtered: string[]) => {
    setFilters(filters => ({
      ...filters,
      [attr]: filtered,
    }))
  }

  const saveFilters = () => {
    const filtered = filterWords(words, filters)
    if (filtered.length) {
      setError(false)
      onFilter(filtered)
    } else {
      setError('Filters must contain at least one word.')
    }
  }

  useEffect(() => {
    const filtered = filterWords(words, filters)
    if (filtered.length) {
      setError(false)
    } else {
      setError(true)
    }
  }, [words, filters])

  // TODO this really should never change
  useEffect(() => {
    setOptions(getFilterFromWords(words))
  }, [words])

  return (
    <div className="space-y-2">
      <FilterList
        name="Lessons"
        options={options.lesson}
        onFilter={filtered => handleFilter('lesson', filtered)}
      />
      <FilterList
        name="Types"
        options={options.type}
        onFilter={filtered => handleFilter('type', filtered)}
      />
      <div className="text-center">
        <Button onClick={saveFilters} error={error}>
          Apply
        </Button>
      </div>
    </div>
  )
}

export default Settings
