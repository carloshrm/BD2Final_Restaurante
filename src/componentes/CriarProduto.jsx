import { controleBD } from "../controleSupabase";
import { useEffect, useState } from "react";
import { templateProduto } from "./templates";

//CREATE TABLE Produto (
//    codigo INT PRIMARY KEY,
//    nome VARCHAR,
//    precoProduto NUMERIC
//);

function CriarProduto({ n, atualizar }) {
  const [infoProds, setInfoProds] = useState(templateProduto);

  function Processar(formProd) {
    const infor = new FormData(formProd);

    let infoLidaP = infoProds;
    for (const info of infor) {
      infoLidaP[info[0].slice()] = info[1];
    }
    setInfoProds(infoLidaP);
    ExecutarCadastroProd();
  }

  async function ExecutarCadastroProd() {
    const { error } = await controleBD.from("produto").insert([
      {
        codigo: n + 1,
        nome: infoProds.nome,
        precoproduto: infoProds.precoproduto,
      }]);
    if (error)
      console.log(error);
    else
      atualizar();
  }

  return (
    <div className='bg-primary-subtle my-2 rounded border border-2 border-dark d-flex align-items-center justify-content-center flex-column text-lg-center'>
      <p className="mt-5">Preencha para criar um novo Produto: </p>
      <form onSubmit={(e) => { e.preventDefault(); Processar(e.target); }}>
        <fieldset>
          <legend className="fw-bold mb-3">Informações do Produto</legend>

          <label htmlFor="nome" className="mb-5">Nome:</label>
          <input type="text" name="nome" id="nome" className="me-5" required />

          <label htmlFor="precoproduto" >Preço:</label>
          <input type="number" step="0.01" name="precoproduto" id="precoproduto" required />

        </fieldset>
        <button type="submit" className="m-4 btn btn-success">Cadastrar</button>
        <button type="reset" className="m-4 btn btn-warning">Limpar Campos</button>
      </form>
    </div>
  );
}

export default CriarProduto;
