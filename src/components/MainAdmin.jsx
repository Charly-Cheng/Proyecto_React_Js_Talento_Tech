import React, { useContext, useMemo } from 'react';
import { AdminContext } from '../context/AdminContext';
import { AuthContext } from '../context/AuthContext';

const MainAdmin = () => {
    const {
        ListaProductos, Categorias, agregarProducto, actualizarProducto, eliminarProducto,
        modoEdicionId, setModoEdicionId,
        productoEditado, setProductoEditado,
        modoAgregar, setModoAgregar,
        nuevoProducto, setNuevoProducto,
        errores, setErrores,
        busquedaTexto, setBusquedaTexto,
        ordenClave, setOrdenClave,
        ordenAsc, setOrdenAsc,
        validar,
        iniciarEdicion,
        editarCampo,
        cancelarEd,
        aceptarEd,
        iniciarAgregar,
        editarNuevo,
        cancelarNew,
        aceptarNew,
    } = useContext(AdminContext);

    const { dataUser } = useContext(AuthContext);

    const productosFiltrados = useMemo(() => {
        let filtrados = ListaProductos.filter(p =>
            p.name_product.toLowerCase().includes(busquedaTexto.toLowerCase())
        );

        filtrados.sort((a, b) => {
            const aVal = a[ordenClave];
            const bVal = b[ordenClave];

            if (ordenClave === 'id' || ordenClave === 'price') {
                return ordenAsc ? aVal - bVal : bVal - aVal;
            } else {
                return ordenAsc
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal));
            }
        });

        return filtrados;
    }, [ListaProductos, busquedaTexto, ordenClave, ordenAsc]);

    return (
        <main className="mainposventas">
            <section className="container">
                <h1>Administrar Productos</h1>
            </section>

            <section className="container">
                {/* Buscar y Ordenar */}
                <div className="d-flex mb-3">
                    <select className="form-select me-2" value={ordenClave} onChange={e => setOrdenClave(e.target.value)}>
                        {['id', 'category', 'name_product', 'price'].map(k => (
                            <option key={k} value={k}>{k}</option>
                        ))}
                    </select>
                    <input
                        placeholder="Buscar..."
                        className="form-control me-2"
                        value={busquedaTexto}
                        onChange={e => setBusquedaTexto(e.target.value)}
                    />
                    <button className="btn btn-outline-secondary" onClick={() => setOrdenAsc(!ordenAsc)}>
                        {ordenAsc ? '⬆️ Asc' : '⬇️ Desc'}
                    </button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Imagen</th><th>ID</th><th>Categoría</th>
                            <th>Nombre</th><th>Precio</th><th>Alt</th><th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map(p => (
                            <React.Fragment key={p.id}>
                                <tr>
                                    <td>
                                        {modoEdicionId === p.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={productoEditado.img}
                                                    onChange={e => editarCampo(e, 'img')}
                                                    className={`form-control ${errores.img ? 'is-invalid' : ''}`}
                                                />
                                                {productoEditado.img && <img src={productoEditado.img} alt="" width="80" className="carrito-img" />}
                                                {errores.img && <div className="text-danger small">{errores.img}</div>}
                                            </>
                                        ) : (
                                            <img src={p.img} alt={p.alt} width="80" className="carrito-img"/>
                                        )}
                                    </td>
                                    <td>{p.id}</td>
                                    <td>
                                        {modoEdicionId === p.id ? (
                                            <>
                                                <select
                                                    className={`form-select ${errores.category ? 'is-invalid' : ''}`}
                                                    value={productoEditado.category}
                                                    onChange={e => editarCampo(e, 'category')}
                                                >
                                                    <option value="">-- Seleccione --</option>
                                                    {Categorias.map(c => (
                                                        <option key={c.id} value={c.id}>{c.id}</option>
                                                    ))}
                                                </select>
                                                {errores.category && <div className="text-danger small">{errores.category}</div>}
                                            </>
                                        ) : p.category}
                                    </td>
                                    <td>
                                        {modoEdicionId === p.id ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className={`form-control ${errores.name_product ? 'is-invalid' : ''}`}
                                                    value={productoEditado.name_product}
                                                    onChange={e => editarCampo(e, 'name_product')}
                                                />
                                                {errores.name_product && <div className="text-danger small">{errores.name_product}</div>}
                                            </>
                                        ) : p.name_product}
                                    </td>
                                    <td>
                                        {modoEdicionId === p.id ? (
                                            <>
                                                <input
                                                    type="number"
                                                    className={`form-control ${errores.price ? 'is-invalid' : ''}`}
                                                    value={productoEditado.price}
                                                    onChange={e => editarCampo(e, 'price')}
                                                />
                                                {errores.price && <div className="text-danger small">{errores.price}</div>}
                                            </>
                                        ) : `$${p.price}`}
                                    </td>
                                    <td>
                                        {modoEdicionId === p.id ? (
                                            <>
                                                <textarea
                                                    className={`form-control ${errores.alt ? 'is-invalid' : ''}`}
                                                    value={productoEditado.alt}
                                                    onChange={e => editarCampo(e, 'alt')}
                                                />
                                                {errores.alt && <div className="text-danger small">{errores.alt}</div>}
                                            </>
                                        ) : p.alt}
                                    </td>
                                    <td>
                                        {modoEdicionId === p.id ? (
                                            <>
                                                <button className="btn btn-sm btn-success me-1" onClick={aceptarEd}>Aceptar</button>
                                                <button className="btn btn-sm btn-secondary" onClick={cancelarEd}>Cancelar</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-sm btn-primary me-1" onClick={() => iniciarEdicion(p)}>Editar</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}

                        {/* Fila de Agregado */}
                        {modoAgregar && (
                            <>
                                <tr>
                                    <td>
                                        <small>Imagen URL</small>
                                        <input
                                            type="text"
                                            className={`form-control ${errores.img ? 'is-invalid' : ''}`}
                                            onChange={e => editarNuevo(e, 'img')}
                                            value={nuevoProducto.img}
                                        />
                                        {nuevoProducto.img && <img src={nuevoProducto.img} alt="" width="80" className="carrito-img" />}
                                        {errores.img && <div className="text-danger small">{errores.img}</div>}
                                    </td>
                                    <td>—</td>
                                    <td>
                                        <small>Categoría</small>
                                        <select
                                            className={`form-select ${errores.category ? 'is-invalid' : ''}`}
                                            onChange={e => editarNuevo(e, 'category')}
                                            value={nuevoProducto.category}
                                        >
                                            <option value="">-- Seleccione --</option>
                                            {Categorias.map(c => (
                                                <option key={c.id} value={c.id}>{c.id}</option>
                                            ))}
                                        </select>
                                        {errores.category && <div className="text-danger small">{errores.category}</div>}
                                    </td>
                                    <td>
                                        <small>Nombre</small>
                                        <input
                                            type="text"
                                            className={`form-control ${errores.name_product ? 'is-invalid' : ''}`}
                                            onChange={e => editarNuevo(e, 'name_product')}
                                            value={nuevoProducto.name_product}
                                        />
                                        {errores.name_product && <div className="text-danger small">{errores.name_product}</div>}
                                    </td>
                                    <td>
                                        <small>Precio</small>
                                        <input
                                            type="number"
                                            className={`form-control ${errores.price ? 'is-invalid' : ''}`}
                                            onChange={e => editarNuevo(e, 'price')}
                                            value={nuevoProducto.price}
                                        />
                                        {errores.price && <div className="text-danger small">{errores.price}</div>}
                                    </td>
                                    <td>
                                        <small>Alt Text</small>
                                        <textarea
                                            className={`form-control ${errores.alt ? 'is-invalid' : ''}`}
                                            onChange={e => editarNuevo(e, 'alt')}
                                            value={nuevoProducto.alt}
                                        />
                                        {errores.alt && <div className="text-danger small">{errores.alt}</div>}
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-success me-1" onClick={aceptarNew}>Aceptar</button>
                                        <button className="btn btn-sm btn-secondary" onClick={cancelarNew}>Cancelar</button>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>

                {/* Botón agregar */}
                {!modoAgregar && (
                    <button className="btn btn-success" onClick={iniciarAgregar}>
                        Agregar Producto
                    </button>
                )}
            </section>
        </main>
    );
};

export default MainAdmin;

