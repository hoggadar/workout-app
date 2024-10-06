import Loader from '../../ui/loader/Loader.jsx'
import Alert from '../../ui/alert/Alert.jsx'

import { useExerciseLog } from './hooks/useExerciseLog.js'

import styles from './ExerciseLog.module.scss'
import HeaderExerciseLog from './HeaderExerciseLog.jsx'
import TableHeader from './table/TableHeader.jsx'
import TableRow from './table/TableRow.jsx'

const ExerciseLog = () => {
  const { exerciseLog, isLoading, isSuccess } = useExerciseLog()

  return (
    <>
      <HeaderExerciseLog exerciseLog={exerciseLog} isSuccess={isSuccess} />
      <div
        className='wrapper-inner-page'
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        {/* <ExerciseError errors={[errorChange,
errorCompleted]} /> */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.wrapper}>
            <TableHeader />
            {exerciseLog?.times.map((item) => (
              <TableRow item={item} key={item.id} />
            ))}
          </div>
        )}

        {isSuccess && exerciseLog?.times?.length === 0 && (
          <Alert type='warning' text='Times not found' />
        )}
      </div>
    </>
  )
}

export default ExerciseLog
