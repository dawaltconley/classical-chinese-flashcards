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
  const [error, setError] = useState<boolean | string>(false)

  const handleFilter = (
    filteredAttr: keyof WordFilter,
    filteredValues: string[]
  ) => {
    // i want to convey some information about the kinds of items
    // in the currently filtered words list by
    //
    // 1) displaying only highlighted filters that are available
    // 2) never affecting the filter list being selected
    // 3) if filter scope is closed then widened, other filters that were not
    //    explicitely disabled should be re-enabled

    const newFilters: WordFilter = {
      ...filters,
      [filteredAttr]: filteredValues,
    }
    // console.log('newFilters')
    // console.log(newFilters)
    // const filtered = filterWords(words, newFilters)
    // console.log('filtered')
    // console.log(filtered)
    // for (let key in newFilters) {
    //   let attr = key as keyof WordFilter
    //   if (attr === filteredAttr) continue
    //   // console.log(attr, filtered, getOptionsFromAttr(filtered, attr))
    //   newFilters[attr] = getOptionsFromAttr(filtered, attr)
    // }
    //
    // console.log(newFilters)
    //
    // if (filtered.length) {
    //   setError(false)
    // } else {
    //   setError(true)
    // }

    setFilters(newFilters)
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
    setOptions({
      lesson: getOptionsFromAttr(words, 'lesson'),
      type: getOptionsFromAttr(words, 'type'),
    })
  }, [words])

  return (
    <form className="space-y-2">
      <FilterList
        name="Lessons"
        options={options.lesson}
        include={filters.lesson}
        onFilter={filtered => handleFilter('lesson', filtered)}
      />
      <FilterList
        name="Types"
        options={options.type}
        include={filters.lesson}
        onFilter={filtered => handleFilter('type', filtered)}
      />
      <div className="text-center">
        <Button onClick={saveFilters} error={error}>
          Apply
        </Button>
      </div>
    </form>
  )
}

export default Settings
