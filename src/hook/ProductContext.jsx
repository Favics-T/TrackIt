import React, { createContext, useState } from "react";
import {  products } from "../data/product";
export const ProductContext = createContext();

export const ProductProvider=({children})=>{
    
    const[cart,setCart] = useState([]);
    const [text, setText] = useState('')

 console.log(products)
    const addToCart=(id)=>{
        setCart((prev)=>{
            //check if it exists
               const itemExists=  products.find(id=> id === id)
               if(itemExists){
                setText('Item added to Cart')
                return [...prev,{id,quantity:1}]
               }

               else return [...prev]
        })
            
    }
    


    return(
        <ProductContext.Provider value={{
                        addToCart,products,cart,text
        }}>
            {children}
        </ProductContext.Provider>
    )
}