import { createContext, useState } from "react"
import { products } from '../data/product'
export const ProductContext = createContext()


export const ProductProvider=({children})=>{

    const[cart, setCart]=useState([])

    const addToCart=(item)=>{
        const itemExists = products.find(it=> it.id === item);
        if(itemExists){
            setCart((prev)=> ([...prev, itemExists]))
        }
        else
            setCart((prev)=>([prev]))

    }

    


    return(
        <ProductContext.Provider value={{
                                            cart,
                                            addToCart

        }} >
            {children}
        </ProductContext.Provider>
    )
}