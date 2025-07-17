import '../styles/style.css'
import { productos} from '../utils/datas.js'
import { Link } from 'react-router-dom';

const Gallery = () => {

    return (
        <section className="productos">

            <h2>Categorias :
                {
                    productos.map((producto, index) => {
                        return (
                            <a key = {index} href={`#${producto.name_product}`}>{producto.name_product}/</a>
                        )
                    }
                    )
                }
            </h2>
            {
                productos.map((producto, index) => {
                    
                    return (
                        
                        <div key = {index} id={producto.name_product} className="product">
                        <img src={producto.img} alt={producto.alt} />
                        <h3>{producto.name_product}</h3>
                        <p>{producto.description}
                            <Link to={"/Productos"}>Ver Todos Productos</Link></p>
                    </div>
                    )
                }
                )
            }
        </section>
    )
}

export default Gallery
