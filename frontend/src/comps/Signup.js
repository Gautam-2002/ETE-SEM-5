import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import itemContext from '../context/items/itemContext';
import userContext from '../context/user/userContext';
import "./../css/aside.css"

function Signup() {
    const user = useContext(userContext);
    const items = useContext(itemContext);
    const nav = useNavigate()

    //Sign up Hnadler to create new account
    async function SignupHandler(e){
        e.preventDefault();
        if(e.target.form[1].value!==e.target.form[2].value){
            alert("Password and Confirm Password does not match")
            e.target.form[1].value = ''
            e.target.form[2].value = ''
            return;
        }
        const formData = {
            name:e.target.form[0].value,
            pwd:e.target.form[1].value,
        }
        const resp = await fetch('http://localhost:3000/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
        })
        const response = await resp.json();
        if(response.msg==='User with same name exists'){
            alert('User with same Username exists');
            return;
        }
        items.displayResponse('Account created successfully!')
        user.setuser(response.msg)
        sessionStorage.setItem('user',JSON.stringify(response.msg));
        nav('/',{redirect:true});
    }

    
  return (
    <div className='login-comp sign-up'>
        <div className=' login-box sign-up'>
            <h3><center>Create Account</center></h3>
            <form method="POST" >

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="uname" placeholder="" required></input>
                    <label htmlFor="uname">Username</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="Password" placeholder="" required></input>
                    <label htmlFor="Password">Password</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="Password" placeholder="" required></input>
                    <label htmlFor="Password">Confirm Password</label>
                </div>

                <button type="submit" onClick={SignupHandler} className="btn btn-outline-orange b">Sign up</button>
                <small>Already a customer? <Link to='/login'> Login</Link></small>
            </form>
        </div>
    </div>
  )
}

export default Signup