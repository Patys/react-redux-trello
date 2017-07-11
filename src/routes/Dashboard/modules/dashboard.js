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
    const { id, dest } = action.payload;
    let task = state.tasks.filter(task=> (parseInt(task.id,10)===parseInt(id, 10)))[0];
    console.log(task);
    task.listId = dest;
    let tasks = state.tasks.reduce((arr, task) => {
      if(parseInt(task.id)!==parseInt(id)) {
        arr.push(task);
      }
      return arr;
    }, []);

    tasks.push(task);
    return {
      ...state,
      tasks
    }
  },
  [DASHBOARD_MOVE_LIST] : (state, action) => {
    const { end, start } = action.payload;
    let elementSource = state.lists.filter(list => parseInt(list.index)===parseInt(start))[0];
    let elementDest = state.lists.filter(list => parseInt(list.index)===parseInt(end))[0];

    elementSource.index = parseInt(end);
    elementDest.index = parseInt(start);

    let lists = state.lists.filter(list => parseInt(list.index)!==parseInt(start) && parseInt(list.index)!==parseInt(end));

    lists.push(elementSource);
    lists.push(elementDest);

    lists.sort(function(a, b) {
      return parseInt(a.index) - parseInt(b.index);
    });

    return {
      ...state,
      lists
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  lists: [
    {
      id: 0,
      index: 0,
      name: 'Testowa 1'
    },
    {
      id: 1,
      index: 1,
      name: 'LOL'
    },
    {
      id: 2,
      index: 2,
      name: 'ID 2'
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
    },
    {
      id: 3,
      listId: 2,
      label: 'Task z listy 2'
    }
  ]
}
export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
