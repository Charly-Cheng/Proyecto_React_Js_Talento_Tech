import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import {AuthContext} from '../context/AuthContext'


const MainCarritos = () => {
    const {cart, addToCart, total,} = useContext(CartContext);
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const limpiarCarrito = () => {
        addToCart(0);  
        alert("Se ha limpiado el carrito");
        navigate('/productos');
    };
    const verDetalle = (category, id) => {
        navigate(`/detallecarritos/${category}/${id}`);
    };

    return (
        <main className="mainposventas">
            <section className="container">
                <h1>Carrito de Productos</h1>
                {cart.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Imagen</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tablaCarrito">
                            {cart.map((car, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={car.img}
                                            alt={car.name_product}
                                            className="carrito-img"
                                            onClick={() => verDetalle(car.category, car.id)}
                                        />
                                    </td>
                                    <td>{car.name_product}</td>
                                    <td>${car.price}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => addToCart(-1, car)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="mt-3">
                    <h3>Total: ${total}</h3>
                </div>
            </section>

            <section className="container">
                <button className="btn btn-dark btn-clima" id="cerrarCarritos" onClick={limpiarCarrito}>Vaciar Carrito</button>
                <button className="btn btn-dark btn-clima" id="salirCarritos" onClick={handleLogout}>Logout</button>
                <div id="resultadoCuentas"></div>
            </section>
        </main>
    );
};

export default MainCarritos;
