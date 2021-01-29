import { ADD_TRANSACTION, REMOVE_TRANSACTION } from "./action"

const initialState = []

const transactionReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_TRANSACTION:
            let addState
            const lastId = state.reduce((max, el) => el.id > max ? el.id : max ,0)
            addState = [...state, {id: lastId + 1, title: action.payload.title, type: action.payload.radio, value: parseFloat(action.payload.value.replace(",", ".")), date: action.payload.date, category: action.payload.select}]
            return addState
        case REMOVE_TRANSACTION:
            let removeState = [...state].filter((e)=> e.id !== action.payload)
            return removeState
        default:
            return state
    }

}

export default transactionReducer