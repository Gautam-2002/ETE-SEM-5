import React, { useContext, useEffect, useState } from 'react'
import itemContext from '../context/items/itemContext';
import userContext from '../context/user/userContext';
import './../css/cart.css';

function CartItem(props) {
  const items = useContext(itemContext)
  const user = useContext(userContext)
  const [obj, setobj] = useState({})
  const [name, setname] = useState('')
  const [qty, setqty] = useState(props.qty)
  const [flag, setflag] = useState(props.flag)

  //Displaying info about the Item
  async function populateItems(){
    try{
      const resp = await fetch(`http://localhost:3000/orders/${props.id}`)
      const data = await resp.json()
      setobj(data)
      setname(data.name)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
      populateItems()
  }, [props.id])

  //Cancelling the order in profile (Your order) section
  async function cancelOrder(){
    
    let resp = await fetch(`http://localhost:3000/purchase/${user.user.id}/${props.id}/delete`,{
      method:'DELETE',
    })
    resp = await resp.json()
    if(resp.msg==='order cancelling succesful'){
      items.displayResponse('Order Cancelled')
      populateItems()
      window.location.reload(false)
    }
  }

  //Increasing qty in cart
  function incQty(){
    let arr = items.Items;

    let obj = arr.filter((e)=>{return e.id===props.id});
    obj = obj[0]
    
    let index = arr.indexOf(obj);
    let cnt = qty+1;

    obj.qty = cnt;
    setqty(cnt);
    
    arr[index] = obj;
    
    items.setItems(arr);
    sessionStorage.setItem('cart',JSON.stringify(arr));
    props.amounting()
  }

  //decreasing qty in cart
  function decQty(){
    let arr = items.Items;
    
    let obj = arr.filter((e)=>{return e.id===props.id});
    obj = obj[0]

    let index = arr.indexOf(obj);
    let cnt = qty-1;
    if(cnt==0){
      arr = arr.filter((e)=>{return e.id!==props.id});

    }else{
      obj.qty = cnt;
      setqty(cnt);
      arr[index] = obj;
    }
    
    
    items.setItems(arr);
    sessionStorage.setItem('cart',JSON.stringify(arr));
    props.amounting()
  }
  

  return (
    <div className="cart-item-box">
        <div className="img-area-box">
            <img src={obj.img} alt="img"></img>
        </div>
        <div className='content-area'>
            <p>{name&&name.length>65?name.slice(0,65)+' ...':obj.name}</p>
            <span>₹ {obj.price}</span>
        </div>
        <div className='price-area'>
            <p>Items {(flag)?`ordered`:`in Cart`} : {qty}</p>
            {(!flag)?<><button className='btn btn-outline-orange d' onClick={incQty}>+</button>
            <button className='btn btn-outline-orange d' onClick={()=>(decQty(false))}>-</button></>:<button className='btn btn-outline-orange' onClick={cancelOrder}>Cancel</button>}
        </div>
    </div>
  )
}

export default CartItem