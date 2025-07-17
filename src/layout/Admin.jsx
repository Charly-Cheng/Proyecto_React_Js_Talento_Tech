import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import MainAdmin from '../components/MainAdmin'

import Footer from '../components/Footer'

import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { AdminContext } from '../context/AdminContext'


function Admin() {

    const { loadingCategorias, agregarProducto, actulizarProducto } = useContext(AdminContext)
    const { open, setOpen, openEditor,seleccionado } = useContext(AdminContext)


    

    return (
        <>
            <Header />
            <MainAdmin />
            <Footer />
        </>
    )

}

export default Admin