import { CHANGE_APP_STATUS } from './mutations.types'
import { APP_STATUSES } from './state'
import { isNumber } from '@/utils/validators'


export default {
  /**
   * Change app status
   *
   * @param {number|APP_STATUSES} payload - Application status
   */
  [CHANGE_APP_STATUS]: (state, payload) => {
    const status = isNumber(payload) ? APP_STATUSES[payload] : APP_STATUSES.indexOf(payload) >= 0 ? payload : false

    if (!status) throw new Error(`Incorrect application status. Expected values: ${APP_STATUSES.join(', ')}`)

    state.status = status
  }
}
