import { ax } from '../../api'

import { EXERCISES } from './exercise.service.js'

const LOG = `${EXERCISES}/log`

class ExerciseLogService {
  async getById(id) {
    return ax.get(`${LOG}/${id}`)
  }

  async create(exerciseId) {
    return ax.post(`${LOG}/${exerciseId}`)
  }

  // "weight"
  // "repeat"
  // "isCompleted"
  async updateTime(timeId, body) {
    return ax.put(`${LOG}/time/${timeId}`, body)
  }

  // 	"isCompleted"
  async complete(id, body) {
    return ax.patch(`${LOG}/complete/${id}`, body)
  }
}

export default new ExerciseLogService()
