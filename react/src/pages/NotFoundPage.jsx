import {Link} from 'react-router-dom'

function NotFoundPage(){
    return(
        <section className='pag-noencontrada'>
            <h2><i className="bi bi-exclamation-circle"></i> 404</h2>
            <p className="negrita">UPS! Página no encontrada.</p>
            <p>Te sugiero que continues navegando en el <Link to='/'>Inicio</Link></p>
        </section>
    );
}

export default NotFoundPage