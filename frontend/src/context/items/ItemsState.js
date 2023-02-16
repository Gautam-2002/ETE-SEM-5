import { useState } from "react";
import ItemContext from "./itemContext";


const ItemState = (props)=>{
    const [Items, setItems] = useState([])

    //To Display Response Text like Added to cart etc.
    const displayResponse = (text)=>{
        let x = document.getElementsByClassName('response')
        x[0].style.visibility = 'visible'
        x[0].innerHTML = text
        setTimeout(() => {
            let x = document.getElementsByClassName('response')
            x[0].style.visibility = 'hidden'
        }, 2000);
    }
    return (
        <ItemContext.Provider value={{Items,setItems,displayResponse}}>
            {props.children}
        </ItemContext.Provider>
    )
}

export default ItemState