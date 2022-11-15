import { useState, useEffect, useCallback } from 'react'
import { Button, Toggle } from './button'
import wordlist, {
  Word,
  WordFilter,
  allWordsFilter,
  getFilterFromWords,
  filterWords,
} from '../data/wordlist'

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

const Settings = ({
  words,
  wordData = wordlist,
  onFilter,
  handleReset,
  isActive,
}: {
  words: Word[]
  wordData?: Word[]
  onFilter: (filter: WordFilter) => void
  handleReset: (filter: WordFilter) => void
  isActive: boolean
}) => {
  // options describe all possible words;
  // filters describe only selected words

  const [options] = useState(allWordsFilter)
  const [filters, setFilters] = useState(getFilterFromWords(words))
  const [error, setError] = useState<boolean | string>(false)

  const handleFilter = (attr: keyof Word, filtered: string[]) => {
    setFilters(filters => ({
      ...filters,
      [attr]: filtered,
    }))
  }

  const validateForm = useCallback(
    (message?: string): boolean => {
      const isValid = filterWords(wordData, filters).length > 0
      if (isValid) {
        setError(false)
      } else {
        setError(message ?? true)
      }
      return isValid
    },
    [wordData, filters]
  )

  const filterError = 'Filters must contain at least one word.'

  const resetCards = () => validateForm(filterError) && handleReset(filters)

  const saveFilters = () => validateForm(filterError) && onFilter(filters)

  useEffect(() => {
    validateForm()
  }, [validateForm])

  useEffect(() => {
    setFilters(getFilterFromWords(words))
  }, [words, isActive])

  return (
    <>
      <div className="space-y-2">
        <FilterList
          name="Lessons"
          options={options.lesson.map(n => n.toString())}
          include={filters.lesson.map(n => n.toString())}
          onFilter={filtered => handleFilter('lesson', filtered)}
        />
        <FilterList
          name="Types"
          options={options.type}
          include={filters.type}
          onFilter={filtered => handleFilter('type', filtered)}
        />
      </div>
      <div className="mt-12 space-x-4 space-y-2 text-center">
        <Button onClick={resetCards} error={error}>
          Reset Cards
        </Button>
        <Button onClick={saveFilters} error={error}>
          Apply Filters
        </Button>
      </div>
    </>
  )
}

export default Settings
