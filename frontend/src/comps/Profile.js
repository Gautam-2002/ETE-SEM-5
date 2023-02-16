import React, { useContext, useEffect, useState } from 'react'
import userContext from '../context/user/userContext';
import './../css/profile.css'
import CartItem from './CartItem';

function Profile() {
    const user = useContext(userContext)
    const [PurchaseData, setPurchaseData] = useState([])

    //Rendering the Items Ordered list
    useEffect(() => {
      async function ItemOrdered(){
        if(sessionStorage.getItem('user')===''||sessionStorage.getItem('user')===null){
          return
        }
        const u = JSON.parse(sessionStorage.getItem('user'))
        let response = await fetch(`http://localhost:3000/purchase/${u.id}`)
        response = await response.json();
        if(response.msg!=='user does not exist'&&response.msg!=='error occured'){
            setPurchaseData(response.msg)
        }
      }
      ItemOrdered();
      // eslint-disable-next-line 
    }, [])

    //Deleting an account
    async function deleteAccount(){
      let resp = await fetch(`http://localhost:3000/signup/${user.user.id}/delete`,{
        method:'DELETE'
      })
      resp = resp.json();
      if(resp.msg==='Acounted deleted succesfully'){
        user.logout()
        window.location.reload(false);
      }
    }

  return (
    <div className='profile-page'>
      {Object.keys(user.user).length === 0?
      <h2>Login required</h2>:
      <><h2 className='d-inline-block'>{user.user.name}'s Ordered Items</h2>
        <br></br>
        <button className='btn btn-outline-orange d-inline-block' onClick={deleteAccount}>Delete account</button>
        <div id='order-items'>
            {(PurchaseData.length>0)?PurchaseData.map((e)=>{return <CartItem key={e.id} id={e.id} qty={e.qty} price={e.price} flag={true} />}):<div id="empty-cart" className='empty-cart'>No data</div>}
        </div></>
      }
    </div>
  )
}

export default Profile;