import { APP_STATUSES } from './state'


export default {
  isLoading: ({ status }) => status === APP_STATUSES[1]
}
