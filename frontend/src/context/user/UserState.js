import { useState } from 'react';
import UserContext from './userContext'

const UserState = (props)=>{
    const [user, setuser] = useState({})
    const login = (u)=>{
        setuser(u);
    }
    const logout = ()=>{
        setuser({});
        sessionStorage.setItem('user','');
        sessionStorage.setItem('cart','');
        sessionStorage.setItem('amount','');
    }
    return (
        <UserContext.Provider value={{user,login,logout,setuser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;