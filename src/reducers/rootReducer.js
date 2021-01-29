import { combineReducers} from "redux"
import transactionReducer from "./transactions/transactionReducer"

const rootReducer = combineReducers({
    transactions: transactionReducer,
})

export default rootReducer