import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
    userReducer: userReducer,
});

//chỗ này createStore bị gạch là do nó bị cũ
export const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());