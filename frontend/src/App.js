import UserState from './context/user/UserState'
import ItemsState from './context/items/ItemsState'
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Cart from "./comps/Cart";
import Display from "./comps/Display";
import Login from "./comps/Login";
import Navbar from "./comps/Navbar";
import './css/app.css'
import Signup from './comps/Signup';
import Profile from './comps/Profile';
function App() {
  return (
    <UserState>
      <ItemsState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Display />}>
            </Route>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/cart' element={<Cart/>} />
          </Routes>
        </BrowserRouter>
        <div className='response'>
        </div>
      </ItemsState>
    </UserState>
  );
}

export default App;
