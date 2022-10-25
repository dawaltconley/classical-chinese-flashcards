import { useState, useEffect } from 'react'
import { Button, Toggle } from './button'
import wordlist, { Word } from '../data/wordlist'

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
  wordData = wordlist,
  onFilter,
}: {
  words: Word[]
  wordData?: Word[]
  onFilter: (filter: WordFilter) => void
}) => {
  // options describe all possible words;
  // filters describe only selected words

  const [options] = useState(getFilterFromWords(wordData))
  const [filters, setFilters] = useState(getFilterFromWords(words))
  const [error, setError] = useState<boolean | string>(false)

  const handleFilter = (attr: keyof Word, filtered: string[]) => {
    setFilters(filters => ({
      ...filters,
      [attr]: filtered,
    }))
  }

  const saveFilters = () => {
    if (filterWords(words, filters).length) {
      setError(false)
      onFilter(filters)
      // onFilter((words: Word[]) => filterWords(words, filters))
    } else {
      setError('Filters must contain at least one word.')
    }
  }

  useEffect(() => {
    if (filterWords(words, filters).length) {
      setError(false)
    } else {
      setError(true)
    }
  }, [words, filters])

  useEffect(() => {
    setFilters(getFilterFromWords(words))
  }, [words])

  return (
    <>
      <div className="space-y-2">
        <FilterList
          name="Lessons"
          options={options.lesson}
          include={filters.lesson}
          onFilter={filtered => handleFilter('lesson', filtered)}
        />
        <FilterList
          name="Types"
          options={options.type}
          include={filters.type}
          onFilter={filtered => handleFilter('type', filtered)}
        />
      </div>
      <div className="mt-6 text-center">
        <Button onClick={saveFilters} error={error}>
          Apply
        </Button>
      </div>
    </>
  )
}

export default Settings

export { filterWords }
export type { WordFilter }
