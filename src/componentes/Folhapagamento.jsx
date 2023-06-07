import React, { useState, useEffect, useRef } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate, useLocation } from "react-router-dom";
import PainelFolha from "./proceduregerarfolha";

import { useReactToPrint } from "react-to-print";

function FolhaPagamento() {

    const conponentPDF = useRef();

    const navigate = useNavigate();
    let { state } = useLocation();
    const [folha, setFolha] = useState([]);
    const [error, setError] = useState(null);
    const [buscaExecutada, setBuscaExecutada] = useState(false);

    useEffect(() => {
        if (!state.gerente) {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setBuscaExecutada(true);

                // Faz a consulta para buscar todos os dados da tabela
                const { data, error } = await controleBD.from('folhapagamento').select('*');

                if (error) {
                    throw error;
                }

                setFolha(data);
                setBuscaExecutada(false);
            } catch (error) {
                setError(error.message);
                setBuscaExecutada(false);
            }
        };

        fetchTodos();
    }, []);


    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: "Userdata",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    return (
        <>{
            
            <div className="w-75 m-auto">
            <div className="d">
                <h2>Gerar folha pagamento:</h2>
                <div className="container-sm m-2 p-2 bg-info-subtle rounded">
                    <PainelFolha fkFuncionario={state.user} />
                </div>
                <button className="btn btn-primary btn-lg b button-danger" onClick={() => navigate(-1)}>Voltar</button>


                <button className="btn btn-primary btn-lg b" onClick={generatePDF}> <i className="fas fa plus" />Gerar pdf</button>
                <div ref={conponentPDF}>
                    <div className="pdf">
                        <br />

                        <h3>Folha pagamento:</h3>
                        <hr />
                        <br />
                        <table className="table table-white m-2">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Data</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>

                            <thead>
                                {folha.map(f => (
                                    <tr key={f.cod}><th>{f.cod}</th><th>{f.mes_ano}</th><th>R${f.total_mensal}.00</th></tr>
                                ))}

                            </thead>
                        </table>
                    </div>
                </div>


            </div>
            </div>}
        </>
    );
}

export default FolhaPagamento;
