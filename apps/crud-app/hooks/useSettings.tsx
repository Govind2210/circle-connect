import { useEffect, useReducer } from 'react';
import type { SettingsType, ActionType } from '../types/types'
const initialState = {
  schema: [],
  sidebar: [],
  view: [],
  add: [],
  edit: [],
};

const schemaReducer = (state: SettingsType, action: ActionType): SettingsType => {
  if (action.type === 'change') {
    return {
      ...action.payload,
    };
  }
  return {
    ...state,
  };
};

const useSettings = (url: string): SettingsType => {
  const [{ schema, sidebar, view, add, edit }, dispatch] = useReducer(
    schemaReducer,
    initialState
  );

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((response: SettingsType) => {
        const action = {
          type: 'change',
          payload: {
            schema: response.schema,
            sidebar: response.sidebar,
            view: response.view,
            add: response.add,
            edit: response.edit,
          },
        };
        dispatch(action);
      })
      .catch((err) => console.log(err));
  }, [url]);

  return {
    schema,
    sidebar,
    view,
    add,
    edit,
  };
};

export default useSettings;
