import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import Loader from '../../ui/loader/Loader.jsx'

import { useListExercises } from './useListExercises.js'

const SelectExercises = ({ control }) => {
  const { data, isLoading } = useListExercises()

  if (isLoading) return <Loader />

  return (
    <Controller
      name='exercises'
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <ReactSelect
            classNamePrefix='select2-selection'
            placeholder='Exercises...'
            title='Exercises'
            options={data.map(exercise => ({
              value: exercise.id,
              label: exercise.name
            }))}
            value={value}
            onChange={onChange}
            isMulti
          />
        )
      }}
    />
  )
}

export default SelectExercises
