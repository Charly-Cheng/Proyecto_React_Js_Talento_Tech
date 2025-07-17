import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
    const { cart } = useContext(CartContext);
    const {
        dataUser,
        isAuthenticated,
        handleLogout
    } = useContext(AuthContext);

    return (
        <div className="divmenu">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Inicio
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Productos"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Productos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Posventas"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Posventas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Contacto"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Contacto
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/Carritos"
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            <span style={{ color: 'Red' }}>{cart.length}</span>
                            <i className="fa-solid fa-cart-shopping" />
                        </NavLink>
                    </li>
                    {!isAuthenticated ? (
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                            >
                                Login
                            </NavLink>
                        </li>
                    ) : (
                        <>
                            {dataUser?.role === 'admin' && (
                                <li>
                                    <NavLink
                                        to="/Admin"
                                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    >
                                        Admin Panel
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="nav-link logout-button"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
