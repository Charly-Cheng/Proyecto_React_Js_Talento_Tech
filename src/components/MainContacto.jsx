import React from 'react'

import '../styles/style.css'

const MainContacto = () => {
    return (
        <main className="maincontacto">
        <h1>Contacto</h1>
        <section>
            <h2>Complete siguiente formulario</h2>

        
            <div className="formulariocontacto">
                
                <form action="" method="" id="miFormulario">
                    <div>
                        <input type="text" placeholder="Ingrese su nombre"  name="Nombre" id="Nombre"  minLength="3" maxLength="30" autoComplete="off" size="40"/>
                    </div>
                    <div>
                        <input type="text" placeholder="Ingrese su apellido"  name="Apellido" id="Apellido"  minLength="3" maxLength="30" autoComplete="off" size="40"/>
                    </div>
                    <div>
                        <input type="email" placeholder="Ingrese su email"  name="Email" id="Email" size="40"/>
                    </div>
                    <div>
                        <input type="tel" placeholder="Ingrese su telefono"  name="Telefono" id="Telefono" size="40"/>
                    </div>
                    <div><label htmlFor="Comnetario">Comentario:</label></div>
                    <div>
                    <textarea name="comentario" id="comentario" rows="10" cols="40" placeholder="Dejar su comentario aqui"></textarea>

                    </div>
                    <div>
                        <input type="reset" value="Limpiar formulario"/>
                        <input type="submit" value="Enviar"/>
                    </div>
                </form>
            </div>


        </section>
        <section className="mapa">

                <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52938394.04350317!2d-161.92225315781042!3d35.91997508297217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2z576O5ZyL!5e0!3m2!1szh-TW!2sar!4v1730666485450!5m2!1szh-TW!2sar" width="300" height="300"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

        </section>
    </main>
    )
}

export default MainContacto