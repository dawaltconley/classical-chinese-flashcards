import { useState, useEffect, useCallback } from 'react'
import Button from './Button'
import Toggle from './Toggle'
import wordlist from '../data/wordlist'
import { Word, WordFilter } from '../types/words'
import { allWordsFilter, filterWords } from '../utils/words'

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

interface FilterListProps {
  name: string
  options: string[]
  include?: string[]
  handleFilter: (options: string[]) => void
}

const FilterList = ({
  name,
  options,
  include,
  handleFilter,
}: FilterListProps) => {
  const [filtered, setFiltered] = useState<FilterMap>(
    mapFromItems(options, include)
  )

  const handleToggle = (item: string, state: boolean) => {
    const newFilters = {
      ...filtered,
      [item]: state,
    }
    setFiltered(newFilters)
    handleFilter(itemsFromMap(newFilters))
  }

  const selectAll = () => {
    setFiltered(mapFromItems(options))
    handleFilter(options)
  }

  const selectNone = () => {
    setFiltered(mapFromItems(options, []))
    handleFilter([])
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
          state={Object.values(filtered).every(Boolean)}
          onToggle={state => (state ? selectAll() : selectNone())}
        />
        {options.map(option => (
          <Toggle
            key={`${name} filter ${option}`}
            name={`${name} filter ${option}`}
            text={option}
            state={filtered[option]}
            onToggle={state => handleToggle(option, state)}
          />
        ))}
      </div>
    </fieldset>
  )
}

export interface FiltersProps {
  wordData?: Word[]
  activeFilters?: WordFilter
  handleFilter: (filter: WordFilter) => void
  handleReset: (filter: WordFilter) => void
  isActive: boolean
}

const Filters = ({
  wordData = wordlist,
  activeFilters = allWordsFilter,
  handleFilter,
  handleReset,
  isActive,
}: FiltersProps) => {
  // filters describe currently selected words, whether or not applied
  const [filters, setFilters] = useState(activeFilters)
  const [error, setError] = useState<boolean | string>(false)

  const handleFilterList = (attr: keyof Word, filtered: string[]) => {
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

  const saveFilters = () => validateForm(filterError) && handleFilter(filters)

  useEffect(() => {
    validateForm()
  }, [validateForm])

  // reset to active filters when settings becomes inactive
  useEffect(() => {
    if (!isActive) setFilters(activeFilters)
  }, [isActive, activeFilters])

  return (
    <>
      <div className="space-y-2">
        <FilterList
          name="Lessons"
          options={allWordsFilter.lesson.map(n => n.toString())}
          include={filters.lesson.map(n => n.toString())}
          handleFilter={filtered => handleFilterList('lesson', filtered)}
        />
        <FilterList
          name="Types"
          options={allWordsFilter.type}
          include={filters.type}
          handleFilter={filtered => handleFilterList('type', filtered)}
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

export default Filters
