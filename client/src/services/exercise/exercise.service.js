import { ax } from '../../api.js'

export const EXERCISES = '/exercises'

class ExerciseService {
  async getAll() {
    return ax.get(EXERCISES)
  }

  async create(exercise) {
    return ax.post(EXERCISES, exercise)
  }

  async update(id, exercise) {
    return ax.put(`${EXERCISES}/${id}`, exercise)
  }

  async delete(id) {
    return ax.delete(`${EXERCISES}/${id}`)
  }
}

export default new ExerciseService()
