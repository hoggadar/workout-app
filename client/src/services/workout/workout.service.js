import { ax } from '../../api.js'

const WORKOUTS = '/workouts'

class WorkoutService {
  async getAll() {
    return ax.get(WORKOUTS)
  }

  async getById(id) {
    return ax.get(`${WORKOUTS}/${id}`)
  }

  async create(workout) {
    return ax.post(WORKOUTS, workout)
  }

  async update(id, workout) {
    return ax.put(`${WORKOUTS}/${id}`, workout)
  }

  async delete(id) {
    return ax.delete(`${WORKOUTS}/${id}`)
  }
}

export default new WorkoutService()
