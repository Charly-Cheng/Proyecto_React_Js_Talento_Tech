import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (vale, product) => {
        if (vale === 0) {
            setCart([])
            toast.info("Carrito vaciado correctamente");
            return;
        }

        if (vale === 1) {
            const exists = cart.some(item => item.name_product === product.name_product);
            if (exists) {
                toast.error("Producto ya está en el carrito");
                return;
            }

            setCart([...cart, product])
            toast.success("Producto agregado al carrito");
            return;
        }

        if (vale === -1) {
            const indexToRemove = cart.findIndex(item => item.name_product === product.name_product)
            if (indexToRemove >= 0) {
                const newCart = [...cart]
                newCart.splice(indexToRemove, 1)
                setCart(newCart)
                toast.success("Producto eliminado del carrito");
            } else {
                toast.warn("El producto no se encontró en el carrito");
            }
            return;
        }
    }

    const total = cart.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2);

    return (
        <CartContext.Provider value={{ cart, addToCart, total }}>
            {children}
        </CartContext.Provider>
    )
}
