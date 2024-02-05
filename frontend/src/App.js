import './App.css';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import background from './assests/background.jpg'
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
   <>
       <img src={background} alt='bgImage' className='fixed w-full -z-10 h-full'/>

      <Header/>
      <main className='py-3'>
        <Container>
        <Outlet />
        </Container>
        </main>
       <Footer/>
       <ToastContainer />
        </>
  );
}

export default App;
