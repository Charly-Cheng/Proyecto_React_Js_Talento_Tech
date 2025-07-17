import './styles/style.css'
import Home from './layout/Home'
import Posventas from './layout/Posventas'
import Contacto from './layout/Contacto'
import Productos from './layout/Productos'
import Carritos from './layout/Carritos'
import Admin from './layout/Admin'
import { Routes, Route, Link } from 'react-router-dom';
import RutaProtegida from './auth/RutasProtegidas'
import Login from './auth/Login'
import DetalleCarritos from './components/DetalleCarritos'
import DetalleProducto from './components/DetalleProducto'

function App() {

  return (
    <>
      
        <Routes>
          <Route path="/" element={<Home  />}></Route>
          <Route path="/Productos" element={<Productos />}></Route>
          <Route path="/Posventas" element={<Posventas  />}></Route>
          <Route path="/Contacto" element={<Contacto  />}></Route>
          <Route path="/Carritos" element={<RutaProtegida><Carritos/>  </RutaProtegida>}></Route>
          <Route path='/login' element={<Login />  }></Route>
          <Route path='/Admin' element={<RutaProtegida><Admin />  </RutaProtegida>  }></Route>
          <Route path="/detalleproducto/:category/:id" element={<DetalleProducto/>} />
          <Route path="/detallecarritos/:category/:id" element={<DetalleCarritos/>} />
          <Route path="*" element={<Home  />}></Route>
        </Routes>
    </>
  )
}

export default App
