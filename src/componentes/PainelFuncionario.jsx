import { useNavigate } from 'react-router-dom';

import fornecedor from './imagens/fornecedor.png';
import forcaixanecedor from './imagens/caixa.png';
import produto from './imagens/produtos.png'
import prato from './imagens/prato.png';

function PainelFuncionario() {
  const navigate = useNavigate();

  return (
    <>
      <div className="centered">
        <div className="home">
          <h4>Painel do Funcionario</h4>
        </div>
      </div>


      <div className="c">
        <div className="card" >
          <img src={fornecedor} className="card-img-top img" alt="Imagem do Card" />
          <div className="card-body">
            <h4 className="card-title">Fornecedor</h4>
            <p className="card-text">Gerenciar Fornecedor</p>
            <button className='btn m-2 btn-info bc' onClick={() => navigate('/gerforn')}>Veja +</button>
          </div>
        </div>
        <div className="card" >
          <img src={forcaixanecedor} className="card-img-top img" alt="Imagem do Card" />
          <div className="card-body">
            <h4 className="card-title">Caixa</h4>
            <p className="card-text">Gerenciar caixa</p>
            <button className='btn m-2 btn-info bc' onClick={() => navigate('/')}>Veja +</button>
          </div>
        </div>
        <div className="card" >
          <img src={produto} className="card-img-top img" alt="Imagem do Card" />
          <div className="card-body">
            <h4 className="card-title">Produtos</h4>
            <p className="card-text">Gerenciar produtos</p>
            <button className='btn m-2 btn-info bc' onClick={() => navigate('/gerprod')}>Veja +</button>
          </div>
        </div>
        <div className="card" >
          <img src={prato} className="card-img-top img" alt="Imagem do Card" />
          <div className="card-body">
            <h4 className="card-title">Pratos</h4>
            <p className="card-text">Gerenciar pratos</p>
            <button className='btn m-2 btn-info bc' onClick={() => navigate('/gerprato')}>Veja +</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PainelFuncionario;
