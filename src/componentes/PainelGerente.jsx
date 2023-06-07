import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate } from 'react-router-dom';

import PainelFolha from './PainelFolha';
import PainelCusto from './PainelCusto';

import gerenciarfunc from './imagens/gerenciar.jpg';
import folhap from './imagens/folhapagamento.png';
import custo from './imagens/custo.png';


function PainelGerente() {
  const navigate = useNavigate();

  return (

    <>
      <div className="centered">
      <div  className="home">
      <h4>Painel do gerente</h4>
      </div>
      </div>
      <div className="c">
        <div className="card" >
          <img src={gerenciarfunc} className="card-img-top img" alt="Imagem do Card" />
          <div className="card-body">
            <h4 className="card-title">Funcionarios</h4>
            <p className="card-text">Editar funcionario</p>
            <button className='btn m-2 btn-info bc' onClick={() => navigate('/gerfunc', { state: { gerente: true } })}>Veja +</button>
          </div>
        </div>
        <div className="card" >
          <img src={folhap} className="card-img-top img" alt="Imagem do Card" />
          <div className="card-body">
            <h4 className="card-title">Folha</h4>
            <p className="card-text">Folha pagamento</p>
            {<PainelFolha />}
          </div>
        </div>
        <div className="card" >
          <img src={custo} className="card-img-top img" alt="Imagem do Card" />
          <div className="card-body">
            <h4 className="card-title">Ver Custo</h4>
            <p className="card-text">Custo mensal</p>
            {<PainelCusto />}
          </div>
        </div>
      </div>
    </>
  );
}

export default PainelGerente;
