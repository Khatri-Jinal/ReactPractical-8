import { createStore } from "redux";
import formReducer from "./form/formReducer";

const store = createStore(formReducer);
export type UserStore = ReturnType<typeof formReducer>
export default store;
