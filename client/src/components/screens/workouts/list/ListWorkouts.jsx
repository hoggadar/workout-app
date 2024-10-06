import Loader from '../../../ui/loader/Loader.jsx'
import Alert from '../../../ui/alert/Alert.jsx'
import Layout from '../../../layout/Layout.jsx'
import styles from '../detail/Workout.module.scss'
import WorkoutItem from './WorkoutItem.jsx'
import { useWorkouts } from './useWorkouts'

const ListWorkouts = () => {
  const { data, error, isLoading, isSuccess, isSuccessMutate, mutate } = useWorkouts()

  return (
    <>
      <Layout bgImage='/images/workout-bg.jpg' heading='Workout list' />
      <div
        className='wrapper-inner-page'
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {error && <Alert type='error' text={error} />}
        {isSuccessMutate && <Alert text='Workout log created' />}
        {isLoading && <Loader />}
        {isSuccess && (
          <div className={styles.wrapper}>
            {data.map(workout => (
              <WorkoutItem key={workout.id} workout={workout} mutate={mutate} />
            ))}
          </div>
        )}

        {isSuccess && data?.length === 0 && (
          <Alert type='warning' text='Workouts not found' />
        )}
      </div>
    </>
  )
}

export default ListWorkouts
