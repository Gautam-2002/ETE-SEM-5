import React, { useEffect, useState ,useContext} from 'react'
import userContext from '../context/user/userContext'
import { Link } from 'react-router-dom'
import './../css/navbar.css'
function Navbar() {
  const [name, setname] = useState('')
  const user = useContext(userContext);

  //function to logout
  function logOut(){
    user.logout();
    setname('')
  }

  // Updating states on user state change
  useEffect(() => {
    let userObj = user.user;
    if(Object.keys(userObj).length === 0&&(sessionStorage.getItem('user')!==''&&sessionStorage.getItem('user')!==null)){
      const u = JSON.parse(sessionStorage.getItem('user'))
      setname(u.name);
      user.setuser(u);
    }
    function check(){
      if(Object.keys(userObj).length !== 0){
        sessionStorage.setItem('user',JSON.stringify(userObj))
        setname(userObj.name);
      }else{
        setname('')
      }
    }
    check()
  },[user])

  return (
    <div className='navbar-box'>
      <div className="heading">
        <Link className='Link' to='/'>
          ShopNow✨
        </Link>
      </div>
      <div className="login-name">{(name===''?<><Link to='/login'className='login-btn btn btn-outline-orange'>Login</Link><Link to='/signup'className='btn btn-outline-orange login-btn'>Sign up</Link></>:<><span>Hi <Link className='Link' to='/profile'><button type='button' className='btn profile'>{name}</button></Link></span> <Link className='logout-btn' onClick={logOut}><button className='btn btn-outline-orange login-btn'>Log out</button></Link></>)}</div>
    </div>
  )
}

export default Navbar