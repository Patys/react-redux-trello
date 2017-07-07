// ------------------------------------
// Constants
// ------------------------------------
export const DASHBOARD_INCREMENT = 'DASHBOARD_INCREMENT'
export const DASHBOARD_DOUBLE_ASYNC = 'DASHBOARD_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : DASHBOARD_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : DASHBOARD_DOUBLE_ASYNC,
          payload : getState().dashboard
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DASHBOARD_INCREMENT]    : (state, action) => state + action.payload,
  [DASHBOARD_DOUBLE_ASYNC] : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  lists: [
    {
        id: 0,
        name: 'Testowa 1'
    },
    {
      id: 1,
      name: 'LOL'
    }
  ],
  tasks: [
    {
      id: 0,
      listId: 0,
      label: 'Hello'
    },
    {
      id: 1,
      listId: 0,
      label: 'Patryk'
    },
    {
      id: 2,
      listId: 1,
      label: 'whoop'
    }
  ]
}
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
