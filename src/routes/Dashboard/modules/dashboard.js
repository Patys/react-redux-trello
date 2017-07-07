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
    const { id, dest } = action.payload
    console.log(action.payload);
    if(id && dest) {
      let task = state.tasks.filter(task=> (task.id===parseInt(dest, 10)))[0];
      console.log('task', task);
      // task.listId = dest;

      let tasks = state.tasks.reduce((arr, task) => {
        // if(parseInt(task.id)!==parseInt(id)) {
          arr.push(task);
        // }
        return arr;
      }, []);

      // tasks.push(task);

      return {
        ...state,
        tasks
      }
    }
    return {
      ...state
    }
  },
  [DASHBOARD_MOVE_LIST] : (state, action) => {
    const { end, start } = action.payload
    if(end && start) {
      let elementSource = state.lists.reduce((arr, list) => {
        if(parseInt(list.index)===parseInt(start))
          arr.push(list);
        return arr;
      }, [])[0];
      let elementDest = state.lists.reduce((arr, list) => {
        if(parseInt(list.index)===parseInt(end))
          arr.push(list);
        return arr;
      }, [])[0];

      elementSource.index = parseInt(end);
      elementDest.index = parseInt(start);

      let lists = state.lists.reduce((arr, list) => {
        if(parseInt(list.index)!==parseInt(start) && parseInt(list.index)!==parseInt(end)) {
          arr.push(list);
        }
        return arr;
      }, []);

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
    else return state;
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
