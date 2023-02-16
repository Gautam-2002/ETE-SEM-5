import React,{useContext} from 'react'
import userContext from '../context/user/userContext';
import itemsContext from '../context/items/itemContext';
import { useNavigate } from 'react-router'
import './../css/items.css'
function ItemsCard(props) {
  const user = useContext(userContext);
  const items = useContext(itemsContext)
  const navigate = useNavigate()

  // if user is signed in the Adds or updates the item in cart
  async function purchaseHandler(){
    let userObj = user.user;
    if(Object.keys(userObj).length === 0){
      navigate('/login',{redirect:true});
    }else{

      if(!items.Items.length===0){
        let cart = [{
          id:props.id,
          qty:1,
          price:props.price
        }];
        items.setItems(cart);
        sessionStorage.setItem('cart',JSON.stringify(cart));
      }else{
        var cart = items.Items;
        let check = cart.filter((e)=>{
          return e.id===props.id
        })
        if(check.length>0){
          var q = check[0].qty;
          cart = cart.filter((e)=>{
            return e.id!==props.id;
          })
          cart = [...cart,{id:props.id,qty:q+1,price:props.price}]
          items.setItems(cart)
          sessionStorage.setItem('cart',JSON.stringify(cart));
        }else{ 
          let obj = {
            id:props.id,
            qty:1,
            price:props.price
          }
          cart = [...cart,obj]
          items.setItems(cart)
          sessionStorage.setItem('cart',JSON.stringify(cart));
        }
        items.displayResponse('Added to cart')
      }
    }
  }
  return (
    <div className='item-card'>
        <div className='item-content'>
            <div className='img-area'><img src={props.img} alt=''></img></div>
            <p>{props.name.length>30?props.name.slice(0,40)+'...':''}</p>
            <span>₹ {props.price}</span>
            <button onClick={purchaseHandler}>Add to Cart</button>
        </div>
    </div>
  )
}

export default ItemsCard