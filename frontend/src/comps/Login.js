import React,{useState, useContext} from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import itemContext from '../context/items/itemContext';
import userContext from '../context/user/userContext';
import "./../css/aside.css"

function Login() {
    const user = useContext(userContext);
    const items = useContext(itemContext);
    // eslint-disable-next-line
    const [data, setdata] = useState({})

    const navigate = useNavigate();
    
    //Checking and return user from DB
    async function fetchUser(userdata){
        try{
            const resp = await fetch('http://localhost:3000/login',{
                method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userdata)
            })
            const d =await resp.json()
            if(d.msg!=='Invalid Username or Password'){
                setdata(d.msg)
                user.setuser(d.msg)
                sessionStorage.setItem('user',JSON.stringify(d.msg));
                setTimeout(()=>{
                    navigate('/',{redirect:true});
                },1000)
                items.displayResponse('Sign in successful!')
            }
        }catch(e){
            items.displayResponse('something went wrong')
            console.log(e);
        }
    }

    //Handler for Login
    async function LoginHandler(e){
        e.preventDefault()
        const formData = {
            name:e.target.form[0].value,
            pwd:e.target.form[1].value
        };
        await fetchUser(formData);
    }

  return (
    <div className='login-comp'>
        <div className=' login-box'>
            <h3><center>Login form</center></h3>
            <form method="POST" >

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="uname" placeholder="" required></input>
                    <label htmlFor="uname">Username*</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="Password" placeholder="" required></input>
                    <label htmlFor="Password">Password*</label>
                </div>

                <button type="submit" onClick={LoginHandler} className="btn btn-outline-orange b">Login</button>
                <small>New customer? <Link to='/signup'> Signup</Link></small>
            </form>
        </div>
    </div>
  )
}

export default Login