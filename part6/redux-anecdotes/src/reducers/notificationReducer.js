import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    dispatch(showNotification(message))

    timeoutId = setTimeout(() => {
      dispatch(hideNotification())
      timeoutId = null
    }, duration * 1000)
  }
}

export default notificationSlice.reducer
