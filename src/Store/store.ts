import {combineReducers, legacy_createStore as createStore} from "redux";
import {UserReducer} from "./user-reducers";
import {MessageReducers} from "./message-reducers";

const rootReducer = combineReducers({
    users: UserReducer,
    messages: MessageReducers
});
export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);