import { createContext, useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const url = 'https://68617e558e74864084462e22.mockapi.io/productos/productos';

    // UI 狀態 Estado
    const [Categorias, setCategorias] = useState([]);
    const [ListaProductos, setListaProductos] = useState([]);
    const [loadingListProductos, setLoadingListProductos] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEditor, setOpenEditor] = useState(false);
    const [seleccionado, setSeleccionado] = useState(null);

    // 查詢分類 Consulta Categoria
    const [busqueda, setBusqueda] = useState({ categoria: '', keyword: '' });
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [palabraClave, setPalabraClave] = useState('');

    const { categoria, keyword } = busqueda;

    const handleBuscar = () => {
        setBusqueda({ categoria: categoriaSeleccionada, keyword: palabraClave });
    };

    const handleLimpiar = () => {
        setCategoriaSeleccionada('');
        setPalabraClave('');
        setBusqueda({ categoria: '', keyword: '' });
    };

    const cargarProductos = async () => {
        try {
            setLoadingListProductos(true);
            const res = await fetch(url);
            const datos = await res.json();
            setListaProductos(datos);
            setLoadingListProductos(false);

            const categoriasUnicas = Array.from(new Set(datos.map(p => p.category)))
                .filter(Boolean)
                .sort((a, b) => a.localeCompare(b))
                .map(cat => ({ id: cat }));

            setCategorias(categoriasUnicas);
        } catch (error) {
            console.error('Error al cargar productos: ', error);
            setLoadingListProductos(false);
            Swal.fire('Error', 'No se pudo cargar productos.', 'error');
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const agregarProducto = async (producto) => {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });
            if (!res.ok) throw new Error('Error al agregar producto');
            await res.json();
            Swal.fire('Éxito', 'Producto agregado correctamente', 'success');
            cargarProductos();
        } catch (error) {
            console.error(error.message);
            Swal.fire('Error', 'No se pudo agregar el producto.', 'error');
        }
    };

    const eliminarProducto = async (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar el producto?');
        if (!confirmar) return;
        try {
            const res = await fetch(`${url}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Error al eliminar');
            Swal.fire('Eliminado', 'Producto eliminado correctamente', 'success');
            cargarProductos();
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo eliminar el producto.', 'error');
        }
    };

    const actualizarProducto = async (producto) => {
        try {
            const res = await fetch(`${url}/${producto.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });
            if (!res.ok) throw new Error('Error al actualizar');
            await res.json();
            Swal.fire('Actualizado', 'Producto actualizado correctamente', 'success');
            setOpenEditor(false);
            setSeleccionado(null);
            cargarProductos();
        } catch (error) {
            console.error(error.message);
            Swal.fire('Error', 'No se pudo actualizar el producto.', 'error');
        }
    };

    // 編輯狀態 Ediatr Estado
    const [modoEdicionId, setModoEdicionId] = useState(null);
    const [productoEditado, setProductoEditado] = useState({});
    const [modoAgregar, setModoAgregar] = useState(false);
    const [nuevoProducto, setNuevoProducto] = useState({});
    const [errores, setErrores] = useState({});

    const [busquedaTexto, setBusquedaTexto] = useState('');
    const [ordenClave, setOrdenClave] = useState('id');
    const [ordenAsc, setOrdenAsc] = useState(true);

    const validar = (prod) => {
        const err = {};
        if (!prod.category) err.category = 'Debe elegir categoría.';
        if (!prod.name_product) err.name_product = 'Nombre es obligatorio.';
        if (!(prod.price > 0)) err.price = 'Precio debe ser mayor a 0.';
        if (!(prod.alt && prod.alt.trim().length >= 10)) err.alt = 'Alt debe tener al menos 10 caracteres.';
        if (!prod.img) err.img = 'URL de imagen es obligatoria.';
        return err;
    };

    const iniciarEdicion = (p) => {
        setModoEdicionId(p.id);
        setProductoEditado({ ...p });
        setErrores({});
    };

    const editarCampo = (e, campo) => {
        setProductoEditado({ ...productoEditado, [campo]: e.target.value });
    };

    const cancelarEd = () => {
        setModoEdicionId(null);
        setProductoEditado({});
        setErrores({});
    };

    const aceptarEd = () => {
        const err = validar(productoEditado);
        if (Object.keys(err).length) return setErrores(err);
        actualizarProducto(productoEditado);
        cancelarEd();
    };

    const iniciarAgregar = () => {
        setModoAgregar(true);
        setNuevoProducto({ img: '', category: '', name_product: '', price: '', alt: '' });
        setErrores({});
    };

    const editarNuevo = (e, campo) => {
        setNuevoProducto({ ...nuevoProducto, [campo]: e.target.value });
    };

    const cancelarNew = () => {
        setModoAgregar(false);
        setNuevoProducto({});
        setErrores({});
    };

    const aceptarNew = () => {
        const err = validar(nuevoProducto);
        if (Object.keys(err).length) return setErrores(err);
        agregarProducto(nuevoProducto);
        cancelarNew();
    };

    const productosFiltrados = useMemo(() => {
        const filtrados = ListaProductos.filter(p =>
            p.name_product.toLowerCase().includes(busquedaTexto.toLowerCase()) ||
            p.category.toLowerCase().includes(busquedaTexto.toLowerCase())
        );

        return filtrados.sort((a, b) => {
            const v1 = a[ordenClave];
            const v2 = b[ordenClave];
            if (ordenClave === 'id' || ordenClave === 'price') {
                return ordenAsc ? v1 - v2 : v2 - v1;
            } else {
                return ordenAsc
                    ? String(v1).localeCompare(String(v2))
                    : String(v2).localeCompare(String(v1));
            }
        });
    }, [ListaProductos, busquedaTexto, ordenClave, ordenAsc]);

    const filtrarProductos = (categoriaActual) => {
        return ListaProductos.filter(producto => {
            const coincideCategoria = categoria === '' || producto.category === categoria;
            const coincideTexto = keyword === '' || producto.name_product.toLowerCase().includes(keyword.toLowerCase());
            return coincideCategoria && coincideTexto && producto.category === categoriaActual;
        });
    };

    const categoriasAMostrar = categoria
        ? Categorias.filter(c => c.id === categoria)
        : Categorias;

    const totalFiltrados = categoriasAMostrar.reduce((total, cat) => {
        const productos = filtrarProductos(cat.id);
        return total + productos.length;
    }, 0);

    return (
        <AdminContext.Provider value={{
            // 資料與 CRUD Datos 
            Categorias, ListaProductos, loadingListProductos,
            agregarProducto, eliminarProducto, actualizarProducto,
            cargarProductos,

            // UI 狀態 estado
            open, setOpen,
            openEditor, setOpenEditor,
            seleccionado, setSeleccionado,

            // 表單控制 contrl de lista
            modoEdicionId, setModoEdicionId,
            productoEditado, setProductoEditado,
            modoAgregar, setModoAgregar,
            nuevoProducto, setNuevoProducto,
            errores, setErrores,

            // 搜尋與排序 busqueda y orden
            busquedaTexto, setBusquedaTexto,
            ordenClave, setOrdenClave,
            ordenAsc, setOrdenAsc,
            productosFiltrados,

            // 驗證與動作 validar y accion
            validar,
            iniciarEdicion, editarCampo, cancelarEd, aceptarEd,
            iniciarAgregar, editarNuevo, cancelarNew, aceptarNew,

            // 分類篩選用 filtro
            filtrarProductos,
            categoriasAMostrar,
            totalFiltrados,
            busqueda, setBusqueda,
            categoriaSeleccionada, setCategoriaSeleccionada,
            palabraClave, setPalabraClave,
            handleBuscar, handleLimpiar,
        }}>
            {children}
        </AdminContext.Provider>
    );
};
