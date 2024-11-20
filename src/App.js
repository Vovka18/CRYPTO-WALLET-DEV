import StartScreen from './pages/start-screen/startScreen';
import SignUp from './pages/sign-up/SignUp';
import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import Payment from './pages/payment/Payment';
import Transfer from './pages/transfer/Transfer';
import ChangePin from './pages/change-pin/ChangePin';
import ChangePin2 from './pages/change-pin2/ChangePin2';
import PaymentComplete from './pages/payment-complete/PaymentComplete';
import TransferComplete from './pages/transfer-complete/TransferComplete';
import EnterPin from './pages/enter-pin/EnterPin';
import './App.css';
import { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  // alert(JSON.stringify(window.Telegram.WebApp.initDataUnsafe?.user?.id))

  // useEffect(async ()=>{
  //   // axios.post()
    
  // })
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path="/" element={<StartScreen/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/sign-up" element={<SignUp/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/home" element={<Home/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/settings" element={<Settings/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/change-pin" element={<ChangePin/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/change-pin-2" element={<ChangePin2/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/payment" element={<Payment/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/payment-complete" element={<PaymentComplete/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/transfer" element={<Transfer/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/transfer-complete" element={<TransferComplete/>} isLoggedIn={isLoggedIn}/>
                  <Route path="/enter-pin" element={<EnterPin/>} isLoggedIn={isLoggedIn}/>
              </Routes>
          </div>
      </BrowserRouter>
          );
          }

          export default App;
