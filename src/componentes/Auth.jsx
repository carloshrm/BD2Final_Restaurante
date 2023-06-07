import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useLoaderData, useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({ email: "", senha: "" });
  const [msgErro, setMsgErro] = useState("");

  async function Login() {
    const { data, error } = await controleBD.auth.signInWithPassword({
      email: loginInfo.email,
      password: loginInfo.senha,
    });
    if (!error)
      navigate('/');
    else
      setMsgErro("Email ou senha inválidos, tente novamente.");
  }

  return (
    <div className="container-sm p-4 m-auto border border-2 bg-light rounded">
      <h4 className="m-4">Entre com seu Email e senha: </h4>
      <form className="container-sm d-flex flex-column" onSubmit={(e) => { e.preventDefault(); Login(); }}>

        <label className="form-label" htmlFor="login-email">Email</label>
        <input className="form-control" required type="email" name="login-email" id="login-email"
          value={loginInfo.email}
          onChange={e => setLoginInfo(anterior => ({ ...anterior, email: e.target.value }))} />

        <label className="form-label" htmlFor="login-senha">Senha</label>
        <input className="form-control" required minLength={6} type="password" name="login-senha" id="login-senha"
          value={loginInfo.senha}
          onChange={e => setLoginInfo(anterior => ({ ...anterior, senha: e.target.value }))} />

        <div>
          {msgErro !== "" ? <p className="p-2 bg-danger text-white fw-bold">{msgErro}</p> : ""}
          <button className="btn btn-success m-4 btn-large" type='submit'>Login</button>
        </div>
      </form>
      <p>ou <a href='/criarconta'>cadastre uma conta.</a></p>
    </div>
  );
}

export default Auth;
