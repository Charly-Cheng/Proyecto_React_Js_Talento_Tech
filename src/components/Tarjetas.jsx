
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Tarjetas({ ListaProductos }) {
    const { cart, addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const verDetalle = (category, id) => {
        navigate(`/detalleproducto/${category}/${id}`);
    };

    return (
        <div className="galeriaproductos">
            {
                ListaProductos.map((producto) => (
                    <div key={producto.id} className="producto-agregar">
                        <img
                            src={producto.img}
                            alt={producto.alt}
                            className="product-img"
                            onClick={() => verDetalle(producto.category, producto.id)}
                        />
                        <h4>
                            {producto.name_product}
                            <span style={{ marginLeft: '10px', color: 'Red' }}>
                                ({cart.filter(item => item.name_product === producto.name_product).length})
                            </span>
                        </h4>
                        <h5>${producto.price}</h5>
                        <button className="btn btn-primary" onClick={() => addToCart(1, producto)}>Agregar a Carrito</button>
                        <button className="btn btn-danger" onClick={() => addToCart(-1, producto)}>Sacar de Carrito</button>
                    </div>
                ))
            }
        </div>
    );
}

export default Tarjetas;
