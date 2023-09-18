import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../../axios-client.js";

export default function Signup(){

  const nomeRef = useRef();
  const emailRef = useRef();
  const senhaRef = useRef();
  const senhaConfirmationRef = useRef();

  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  const errorTranslations = {
    required: 'Campo obrigatório',
    email: 'Email inválido',
    unique: 'Este email já está em uso',
    // Adicione mais traduções conforme necessário
  };
  const onSubmit = (ev) =>
  {
    ev.preventDefault()
    const payload =
      {
        nome: nomeRef.current.value,
        email: emailRef.current.value,
        senha: senhaRef.current.value,
        senha_confirmation: senhaConfirmationRef.current.value,
      }
      console.log(payload)
      axiosClient.post('/CadastrarUsuario', payload)
        .then(({data}) => {
        setUser(data.user)
          setToken(data.token)

      }).catch( err => {
          const response = err.response;
          if(response && response.status == 422)
          {
            console.log(response.data.errors)
            setErrors(response.data.errors)
          }
        })
  }

    return (
      <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <h1 className="title">Crie sua conta</h1>

          <form onSubmit={onSubmit}>
            <input ref={nomeRef} type="text" placeholder="Nome"/>
            <input ref={emailRef} type="email" placeholder="Email"/>
            <input ref={senhaRef} type="password" placeholder="Senha"/>
            <input ref={senhaConfirmationRef} type="password" placeholder="Confirmar Senha"/>
            <button className="btn btn-block">Cadastrar</button>

            {
              errors && Object.keys(errors).map((key, index) => (
                  <p key={index}>{errors[key][0]}</p>
                ))
            }
            <p className="message">
              Já tem uma conta? <Link to="/login">Faça Login</Link>
            </p>
          </form>
        </div>
      </div>
    )
}
