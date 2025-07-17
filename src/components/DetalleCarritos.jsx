import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { useParams,  Link } from 'react-router-dom';


const DetalleProducto = () => {
    const { category, id } = useParams();


    return (
        <>
            <Header />
            <main className="mainposventas">
                <section className="container">
                    <h1>Detalles del Producto</h1>
                </section>
                <section className="container">

                    <div className="container mt-4">

                        <p>Categoría: {category}</p>
                        <p>ID: {id}</p>

                    </div>
                    <Link to="/carritos" className="btn btn-dark" >Volver Al Carrito</Link>
                </section>
            </main>


            <Footer />
        </>
    );
};

export default DetalleProducto;
