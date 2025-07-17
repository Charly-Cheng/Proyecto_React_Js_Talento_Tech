import '../styles/style.css';
import Tarjetas from './Tarjetas';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { CartContext } from '../context/CartContext';

const MainProductos = () => {
    const {
        filtrarProductos,
        categoriasAMostrar,
        totalFiltrados,
        loadingListProductos
    } = useContext(AdminContext);

    const { cart } = useContext(CartContext);

    return (
        <main className="maingaleria">
            <section className="galeria">

                {/* 👇 Loading Spinner */}
                {loadingListProductos ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="mt-2">Cargando productos...</p>
                    </div>
                ) : totalFiltrados === 0 ? (
                    <p className="alert alert-warning text-center">
                        ⚠️ No hay productos que coincidan con tus criterios de búsqueda. Prueba con otras palabras clave o categorías.
                    </p>
                ) : (
                    categoriasAMostrar.map((cat) => {
                        const productosFiltrados = filtrarProductos(cat.id)
                            .sort((a, b) => a.name_product.localeCompare(b.name_product));

                        if (productosFiltrados.length === 0) return null;

                        const productosEnCarrito = cart.filter(item => item.category === cat.id).length;

                        return (
                            <div key={cat.id} id={cat.id} className="product">
                                <h3>
                                    {cat.id}（Hay {productosFiltrados.length} productos，Has agregado {productosEnCarrito}）
                                </h3>
                                <Tarjetas ListaProductos={productosFiltrados} />
                            </div>
                        );
                    })
                )}
            </section>
        </main>
    );
};

export default MainProductos;
