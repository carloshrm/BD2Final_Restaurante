import React, { useState, useEffect, useRef } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate, useLocation } from "react-router-dom";
import PainelFolha from "./procedurecustomensal";

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
                const { data, error } = await controleBD.from('customensal').select('*');

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
                <h2>Custo mensal</h2>
                <div className="container-sm m-2 p-2 bg-info-subtle rounded">
                    <PainelFolha fkFuncionario={state.user} />
                </div>
                
                <button className="btn btn-primary btn-lg" onClick={() => navigate(-1)}>Voltar</button>
                
                <button className="btn btn-primary btn-lg b" onClick={generatePDF}> <i className="fas fa plus" />Gerar pdf</button>
                <div ref={conponentPDF}>
                <div className="pdf">
                        <br />

                        <h3>Custo Mensal</h3>
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
                            <tr key={f.id}><th>{f.id}</th><th>{f.data}</th><th>R${f.valor}.00</th></tr>
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
