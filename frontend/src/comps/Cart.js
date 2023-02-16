import React, { useEffect, useState ,useContext} from 'react'
import userContext from '../context/user/userContext';
import itemContext from '../context/items/itemContext';
import './../css/cart.css';
import CartItem from './CartItem';
function Cart() {
    const user = useContext(userContext);
    const items = useContext(itemContext)
    const [amount, setamount] = useState('')

    //Calculating the final amount for Items in cart
    function amounting(){
        if(sessionStorage.getItem('cart')===''||sessionStorage.getItem('cart')===null){
            return;
        }
            let arr = JSON.parse(sessionStorage.getItem('cart'));
            items.setItems(arr)
            let num = 0;
            for(let i=0;i<arr.length;i++){
                num += arr[i].price*arr[i].qty;
            }
            sessionStorage.setItem('amount',num)
            setamount(num);
    }

    //Placing the order and it empties the cart afterward
    async function orderPlace(){
        if(items.Items.length===0){
            items.displayResponse('No items to order')
            return;
        }
        let orderList = {
            "userid":user.user.id,
            "list":items.Items
        };
        const resp = await fetch('http://localhost:3000/purchase',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(orderList)
        })
        const respData = await resp.json();
        if(respData.msg==='ItemsOrder'){
            items.setItems([])
            sessionStorage.setItem('cart','')
            sessionStorage.setItem('amount','')
            setamount('')
            items.displayResponse('Order Placed');
        }
    }

    //Set Items in cart to render
    useEffect(() => {
        let itemList = items.Items;
        if(itemList.length === 0&&(sessionStorage.getItem('cart')!==''&&sessionStorage.getItem('cart')!==null)){
          const u = JSON.parse(sessionStorage.getItem('cart'))
          items.setItems(u);
        }
        if(amount===0&&(sessionStorage.getItem('amount')!==''&&sessionStorage.getItem('amount')!==null)){
            setamount(sessionStorage.getItem('amount'))
        }
        amounting();
         // eslint-disable-next-line
    }, [])

  return (

    <div className="cart-box">
        <div id='cart-items'>
            {items.Items.length>0?
            items.Items.map((e)=>{
                return <CartItem amounting={amounting} key={e.id} id={e.id} qty={e.qty} price={e.price} flag={false} />}):<div id='empty-cart'>No items in cart</div>
            }
        </div>
        <div id="total-box">
            <div>
                <div id="total-content">
                    <h3 className='mb-4'>Amount to be paid</h3>
                    <p className='ms-5'>Total amount : ₹ {amount!==''?amount:'0'}.00</p>
                    <button className='btn btn-outline-orange login-btn c' onClick={orderPlace}> Place order</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart