import React,{useContext, useEffect,useState} from 'react'
import itemContext from '../context/items/itemContext';
import './../css/items.css'
import ItemsCard from './ItemsCard';



function Items() {
  const items = useContext(itemContext)
  const [Orders, setOrders] = useState([])

  //Renders all the Items on the Home page
  useEffect(() => {
    async function fetchData(){
      let resp = await fetch('http://localhost:3000/orders');
      resp = await resp.json()
      setOrders(resp);
    }
    fetchData();
    
    // eslint-disable-next-line
  }, [])

  //Till the Orders are getting fetched
  if(Orders.length===0){
    return(
      <div className='items-box'>
        <div>Loading...</div>
      </div>
    )
  }
  return (
    <div className='items-box'>
      <div className='wrapper'>
        {Orders.map((ele)=>{return <ItemsCard key={ele._id} id={ele._id} name={ele.name} price={ele.price} img={ele.img}/>})}
      </div>
    </div>
  )
}

export default Items