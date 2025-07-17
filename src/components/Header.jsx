import React from 'react'
import Nav from './Nav'
import '../styles/style.css'
import logo from '../assets/img/AMERICA_LOGO.png'
import headarfondo from '../assets/img/pos_backgroung_dark.png'




const Header = () => {



    return (
        <header className='header'>
            <div>
                <a href="#"><img className="logo" src={logo} alt="Logo america Equipamientos" /></a>
            </div>
            <div >
                <img className="headarfondo" src={headarfondo} alt="fondo de header" />
            </div>
            <div>
                <Nav/>
            </div>
        </header>
    )
}

export default Header



