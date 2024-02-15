import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import { StyledEngineProvider } from '@mui/material';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';
import  {RegisterScreen}  from './screens/RegisterScreen';
import TicketScreen from './screens/TicketScreen'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* <Route index={true} path="/" element={<Header />}/> */}
      <Route index={true} path="/" element={<HomeScreen />}/>
      <Route  path="/SearchScreen" element={<SearchScreen />}/>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/ticket" element={<TicketScreen />} />



    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <StyledEngineProvider injectFirst>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>

    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
