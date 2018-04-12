import {
  FETCH_USERS,
  FETCH_CURRENT_USER,
  FETCH_ADMINS
} from './types'

export const fetchUsers = () => {
  return async (dispatch, getState, api) => {
    try {
        const response = await api.get('/users')
        dispatch({
          type : FETCH_USERS,
          payload : response.data
        });
    } catch (e) {
      console.log(e.response);
    }
  }
}

export const fetchCurrentUser = () => {
  return async (dispatch, getState, api) => {
    try {
        const response = await api.get('/current_user')
        dispatch({
          type : FETCH_CURRENT_USER,
          payload : response.data
        });
    } catch (e) {
      console.log(e.response);
    }
  }
}

export const fetchAdmins = () => {
  return async (dispatch, getState, api) => {
    try {
        const response = await api.get('/admins')
        dispatch({
          type : FETCH_ADMINS,
          payload : response.data
        });
    } catch (e) {
      console.log(e.response);
    }
  }
}
