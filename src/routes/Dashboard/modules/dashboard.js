// ------------------------------------
// Constants
// ------------------------------------
export const DASHBOARD_MOVE_TASK = 'DASHBOARD_MOVE_TASK'
export const DASHBOARD_MOVE_LIST = 'DASHBOARD_MOVE_LIST'

// ------------------------------------
// Actions
// ------------------------------------
export function moveTask (value) {
  return {
    type    : DASHBOARD_MOVE_TASK,
    payload : value
  }
}

export function moveList (value) {
  return {
    type    : DASHBOARD_MOVE_LIST,
    payload : value
  }
}

export const actions = {
  moveTask,
  moveList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DASHBOARD_MOVE_TASK] : (state, action) => {
    console.log(DASHBOARD_MOVE_TASK);
    console.log(state);
    console.log(action);
    return state;
  },
  [DASHBOARD_MOVE_LIST] : (state, action) => {
    console.log(DASHBOARD_MOVE_LIST);
    console.log(state);
    console.log(action);
    return state;
  }
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
