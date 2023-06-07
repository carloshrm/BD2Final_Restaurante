import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate } from "react-router-dom";

function GerenciarFornecimento() {

    const navigate = useNavigate();

    const [forne, setForne] = useState([]);
    const [error, setError] = useState(undefined);
    const [buscaExecutada, setBuscaExecutada] = useState(false);


    useEffect(() => {
        (async () => {
            const { data, error } = await controleBD.from('viewfornecedoresprodutos').select('*');
            if (error) {
                console.log(error);
            }
            setForne(data);
        })();
    }, []);

    return (
        <>
            <div className="w-75 m-auto bg-light rounded p-4">
                <h2>Lista Fornecedores produtos</h2>
                <table className="table table-light">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>Produto</th>
                            <th>Preço do produto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {forne.some(_ => true) ? forne.map((f, i) => {
                            return (
                                <tr key={i}>
                                    <td>{f.nome_fornecedor}</td>
                                    <td>{f.telefone}</td>
                                    <td>{f.nome_produto}</td>
                                    <td>{f.precoproduto}</td>
                                    <td></td>
                                </tr>);
                        }) : ""}
                    </tbody>
                </table>
                <button className="btn btn-primary btn-lg" onClick={() => navigate(-1)}>Voltar</button>
            </div>
        </>
    );
}

export default GerenciarFornecimento;