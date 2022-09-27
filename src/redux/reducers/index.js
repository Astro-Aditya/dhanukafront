import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import alert from './alert'
import auth from './auth'
import products from './products'
import tickets from './tickets'
import farmer from './farmer'
import filteredTickets from './filteredTickets'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'primary',
    storage,
    whitelist: ['auth']
}

const rootReducer= combineReducers({
    auth,
    alert,
    products,
    tickets,
    farmer,
    filteredTickets
})

export default persistReducer(persistConfig, rootReducer)