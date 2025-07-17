import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/AMERICA_LOGO.png';

const Footer = () => {
    return (
        <footer className="footer">
            <section className="footer__branding">
                <div className="footer__logo">
                    <Link to="/">
                        <img src={logo} alt="Logo America Equipamientos" className="logo" />
                    </Link>
                </div>
                <div className="footer__info">
                    <p>Talento Tech | America Equipamientos &copy; 2024</p>
                    <p>Todos los derechos reservados</p>
                </div>
            </section>

            <section className="footer__services">
                <h3>Nuestros Servicios</h3>
                <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/posventas">Posventas</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li>
                            <Link to="/Carritos" aria-label="Ir al carrito">
                                <i className="fa-solid fa-cart-shopping"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </section>

            <section className="footer__contacto">
                <h3>Contactanos</h3>
                <address>
                    <p>Dirección: Calle Falsa 646, CABA</p>
                    <p>Teléfono fijo: +54 11 1234-4321</p>
                    <p>Celular: +54 9 11 1234-4321</p>
                    <p>Email: americaequipamientos@gmail.com</p>
                </address>
            </section>

            <section className="footer__social">
                <h3>Conectar con nosotros</h3>
                <form
                    action="https://formspree.io/f/xwpkvvbr"
                    method="POST"
                    className="footer__form"
                >
                    <input
                        type="email"
                        name="emailSus"
                        id="emailSus"
                        placeholder="Tu correo electrónico"
                        required
                    />
                    <input type="submit" value="Suscribirse" />
                </form>

                <div className="footer__redes">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://www.youtube.com/@Tecnocompusrl" target="_blank" rel="noopener noreferrer">YouTube</a>
                </div>
            </section>

            <div className="footer__extra">
                <a
                    href="https://web.whatsapp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                >
                    <i className="fa-brands fa-whatsapp"></i>
                </a>
                <Link to="/" aria-label="Volver arriba">
                    <img className="up" src={logo} alt="Volver arriba - America Equipamientos" />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
