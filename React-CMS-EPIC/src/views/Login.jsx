import {Link} from "react-router-dom";

export default function Login(){

  const onSubmit = (ev) =>
  {
    ev.preventDefault()
  }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
              <h1 className="title">Entre na sua conta</h1>
              <form onSubmit={onSubmit}>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Senha"/>
                <button className="btn btn-block">Entrar</button>
                <p className="message">
                  Não registrado? <Link to="/signup">Crie uma conta!</Link>
                </p>
              </form>
            </div>
        </div>
    )
}
