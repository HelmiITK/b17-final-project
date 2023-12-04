import { configureStore } from "@reduxjs/toolkit"; 
import thunk from "redux-thunk";

export default configureStore({
    // reducer: rootReducers,
    // devTools: ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})