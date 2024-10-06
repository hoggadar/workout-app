import { ax } from '../../api.js'
import { WORKOUTS } from './workout.service.js'

const LOG = `${WORKOUTS}/log`

class WorkoutLogService {
  async getById(id) {
    return ax.get(`${LOG}/${id}`)
  }

  async create(workoutId) {
    return ax.post(`${LOG}/${workoutId}`)
  }

  async complete(id) {
    return ax.patch(`${LOG}/complete/${id}`)
  }
}

export default new WorkoutLogService()
