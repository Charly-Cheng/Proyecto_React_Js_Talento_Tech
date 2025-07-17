import '../styles/style.css'
import Gallery from './Gallery.jsx'
import {Link } from 'react-router-dom';

const MainHome = () => {
    return (
        <main className="main">
            <section className="principal ">
                <h1>Equipamientos Supermercados</h1>
                <div >
                    <h2>Calidad Confianza y Servicio al Cliente</h2>
                    <Link to={"/Productos"}>Productos</Link>
                </div>
            </section>
            <Gallery />
        </main>
    )
}

export default MainHome
