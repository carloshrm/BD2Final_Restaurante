import { controleBD } from "../controleSupabase";
import { useEffect, useState } from "react";
import { templateFornecedor } from "./templates";


//CREATE TABLE Fornecedor ( 
//    nome VARCHAR, 
//    telefone NUMERIC, 
//    Endereco VARCHAR, 
//    CNPJ NUMERIC PRIMARY KEY, 
//    id NUMERIC 
//);

function CriarFornecedor() {
    const [infoForne, setInfoForne] = useState(templateFornecedor);
    
    function ProcessarF(formForne) {
        const infof = new FormData(formForne);
    
        let infoLidaF = infoForne;
        console.log(infoLidaF, "teste");
        for (const info of infof) {
            infoLidaF[info[0].slice()] = info[1];
        }

        setInfoForne(infoLidaF);
        ExecutarCadastroForne();
        console.log(infoLidaF, "funfou");
    }

    async function ExecutarCadastroForne(){
        const { error } = await controleBD.from("fornecedor").insert([
            {
                nome: infoForne.nome,
                telefone: infoForne.telefone.replace(/\D/g, ''),
                endereco: infoForne.endereco,
                cnpj: infoForne.cnpj.replace(/\D/g, ''),
                id: infoForne.id.replace(/\D/g, ''),
            }]);
            console.log("cadastrou");
    }

    return(
        <div>
            <p>Cadastro de Fornecedor</p>
            <form onSubmit={(e) => {{e.preventDefault(); ProcessarF(e.target);}}}>
                <fieldset>
                    <legend>Informações do Fornecedor</legend>

                    <label htmlFor="nome">Nome:</label>
                    <input type="text" name="nome" id="nome" required />

                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" minLength={8} name="telefone" id="telefone" required />

                    <label htmlFor="endereco">Endereço:</label>
                    <input type="text" name="endereco" id="endereco" required />

                    <label htmlFor="cnpj">CNPJ:</label>
                    <input type="text" name="cnpj" id="cnpj" required />

                    <label htmlFor="id">Identificador:</label>
                    <input type="text" name="id" id="id" required />
                </fieldset>
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar Campos</button>
            </form>
        </div>
    );
}
export default CriarFornecedor;