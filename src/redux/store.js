import { compose, createStore } from "redux";
import { loadState, saveState } from "./localStorage";
import reducers from "./reducers";

const localData = loadState();
const store = createStore(
  reducers,
  localData,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState({ users: store.getState().users });
  console.log("saved", loadState());
});

export default store;
