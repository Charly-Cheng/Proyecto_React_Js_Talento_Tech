import Nav from './Nav'
import '../styles/style.css'
import logo from '../assets/img/AMERICA_LOGO.png'
import headarfondo from '../assets/img/pos_backgroung_dark.png'
import { useContext} from 'react'
import { AdminContext } from '../context/AdminContext'

const HeaderProductos = () => {
    const { Categorias, setBusqueda,
            categoriaSeleccionada, setCategoriaSeleccionada,
            palabraClave, setPalabraClave,
            handleBuscar, handleLimpiar
    } = useContext(AdminContext);


    return (
        <header className="headergaleria">
            <section className="gheader">
                <div>
                    <a href="../index.html">
                        <img className="logo" src={logo} alt="Logo america Equipamientos" />
                    </a>
                </div>
                <div><img className="headarfondo" src={headarfondo} alt="fondo de header" /></div>
                <div><h1>Galería de Productos</h1></div>
                <div><Nav /></div>
            </section>
            <section className="subheader">
                <div className="buscador-container">
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    >
                        <option value="">-- Todas las categorías --</option>
                        {Categorias.map((cat, idx) => (
                            <option key={idx} value={cat.id}>{cat.id}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={palabraClave}
                        onChange={(e) => setPalabraClave(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleBuscar}>
                        Buscar
                    </button>
                    <button className="btn btn-secondary" onClick={handleLimpiar}>
                        Limpiar
                    </button>
                </div>
            </section>
        </header>
    );
};

export default HeaderProductos



