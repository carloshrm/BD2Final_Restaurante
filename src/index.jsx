import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider, } from "react-router-dom";

import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from './componentes/Home';
import CriarConta from './componentes/CriarConta';
import CriarProduto from './componentes/CriarProduto';
import FotoUsuario from './componentes/FotoUsuario';
import FuncionarioForm from './componentes/FuncionarioForm';
import GerenciarFuncionarios from './componentes/GerenciarFuncionarios';
import CriarFornecedor from './componentes/CriarFonecedor';
import HeaderGeral from './componentes/HeaderGeral';
import AuthLoader from './componentes/AuthLoader';
import GerenciarFornecimento from './componentes/GerenciarFornecimento';
import Gerarfolha from './componentes/proceduregerarfolha';
import Gerarcusto from './componentes/procedurecustomensal';
import Folhapagamento from './componentes/Folhapagamento';
import GerenciarPratos from './componentes/GerenciarPratos';
import Erro from './componentes/Erro';
import GerenciarProdutos from './componentes/GerenciarProdutos';

import CustoMensal from './componentes/CustoMensal';


const root = ReactDOM.createRoot(document.getElementById('root'));

const Layout = () => (
  <>
    <HeaderGeral />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: AuthLoader,
    errorElement: <Erro />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: AuthLoader
      },
      {
        path: "/criarconta",
        element: <CriarConta />
      },
      {
        path: "/editfunc",
        element: <FuncionarioForm />
      },
      {
        path: "/gerfunc",
        element: <GerenciarFuncionarios />
      },
      {
        path: "/gerprod",
        element: <GerenciarProdutos />
      },
      {
        path: "/fotousuario",
        element: <FotoUsuario />
      },
      {
        path: "/criarfornecedor",
        element: <CriarFornecedor />
      },
      {
        path: "/proceduregerarfolha",
        element: <Gerarfolha />
      },
      {
        path: "/procedurecustomensal",
        element: <Gerarcusto/>
      },
      {
        path: "/CustoMensal",
        element: <CustoMensal/>
      },
      {
        path: "/Folhapagamento",
        element: <Folhapagamento />
      },
      {
        path: "/gerprato",
        element: <GerenciarPratos />
      },
      {
        path: "/gerforn",
        element: <GerenciarFornecimento />
      },
    ]
  }
]);

root.render(
  <RouterProvider router={router} />
);