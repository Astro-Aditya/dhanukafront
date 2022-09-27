import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {store, persistor} from './store'
import PrivateRoute from './components/routing/PrivateRoute';
import Tickets from './pages/Tickets';


function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <Router>
          <div className="App">
            <Routes>          
              <Route exact path="/" element={<Login/>} />
              <Route exact path="/dashboard" 
              element={<PrivateRoute>
                        <Dashboard/>
                      </PrivateRoute>} 
              />  
              {/* <Route exact path="/tickets" 
              element={<PrivateRoute>
                        <Tickets/>
                      </PrivateRoute>} 
              />   */}
              <Route exact path="/tickets" element={<Tickets/>} />
            </Routes>
          </div>
        </Router>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;
