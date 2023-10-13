import { applyMiddleware, combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    userReducer: userReducer,
});

//chỗ này createStore bị gạch là do nó bị cũ
export const store = createStore(rootReducer,applyMiddleware(thunk));