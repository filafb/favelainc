import { useReducer } from "react"

const SUCCESS = "SUCCESS"
const ERROR = "ERROR"
const SUBMITTING = "SUBMITTING"
const IDLE = "IDLE"

const types = {
  SUCCESS,
  ERROR,
  SUBMITTING,
  IDLE
}

const initialState = IDLE

function formControlReducer(state = initialState, event) {
  switch (event.type) {
    case SUCCESS:
      return SUCCESS
    case ERROR:
      return ERROR
    case SUBMITTING:
      return SUBMITTING
    case IDLE:
      return IDLE
    default:
      return state
  }
}

export default function useFormControl() {
  const [status, handleStatus] = useReducer(formControlReducer, initialState)

  return [status, handleStatus, types]
}
