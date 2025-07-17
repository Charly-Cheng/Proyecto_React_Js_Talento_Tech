import HeaderProductos from '../components/HeaderProductos'
import MainProductos from '../components/MainProductos'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'


function Productos() {
    const { loadingCategorias } = useContext(CartContext)
    
    return (
        <>
            <HeaderProductos />
            {
                loadingCategorias ? (
                    <main className="maingaleria">
                        <section className="galeria">
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-primary" role="status">
                                </div>
                            </div>
                        </section>
                    </main>
                ) : (
                    <MainProductos />
                )}
            <Footer />
        </>
    )

}

export default Productos