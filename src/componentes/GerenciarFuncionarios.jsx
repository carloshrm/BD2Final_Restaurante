import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import FuncionarioViewSimples from "./FuncionarioViewSimples";
import { useNavigate, useLocation } from "react-router-dom";


function GerenciarFuncionarios() {
    const navigate = useNavigate();
    let { state } = useLocation();
    const [funcionarios, setFuncionarios] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [busca, setBusca] = useState("");
    const [buscaExecutada, setBuscaExecutada] = useState(false);

    useEffect(() => {


        controleBD.from("turnos").select("*").then(r => {
            if (!r.error) {
                setTurnos(r.data);
            }
            else
                console.log(r.error);
        });
    }, []);

    async function PreencherEmails(fc) {
        return Promise.all(fc.map(async d => ({ ...d, email: await GetEmail(d.id) })));
    }

    async function GetEmail(funcID) {
        if (!funcID)
            return "Não cadastrado.";

        const { data } = await controleBD.rpc('get_email', { id: funcID });
        return data;
    }

    function GetTodosFuncionarios() {
        setBuscaExecutada(true);
        controleBD.from("funcionario_completo").select("*").then(r => {
            if (!r.error) {
                PreencherEmails(r.data).then(f => {
                    setFuncionarios(f);
                });
            }
            else
                console.log(r.error);
        });
    }

    function LerTurno(t) {
        return turnos.find(({ turnos }) => turnos.toLowerCase().replace('ã', 'a').includes(t));
    }

    function ExecutarConsulta() {
        const tipo = document.getElementById("buscaTipo");
        if (tipo.value === 't') {
            controleBD.from("funcionario_completo")
                .select("*")
                .eq('fk_turno_s__turno_s__pk', LerTurno(busca.toLowerCase()).turno_s__pk)
                .limit(1)
                .then(r => {
                    if (!r.error) {
                        PreencherEmails(r.data).then(f => {
                            setFuncionarios(f);
                        });
                    }
                    else
                        console.log(r.error);
                });

        } else {
            controleBD.from("funcionario_completo")
                .select("*")
                .ilike("nome", `%${busca}%`)
                .then(r => {
                    if (!r.error) {
                        PreencherEmails(r.data).then(f => {
                            setFuncionarios(f);
                        });
                    }
                    else
                        console.log(r.error);
                });
        }
        setBuscaExecutada(true);
    }

    return (
        <>
            <div className="w-75 p-4 mx-auto my-4 bg-secondary-subtle rounded">
                <h2>Gerenciar funcionarios:</h2>
                <div className="container-sm mx-auto my-4 p-2 bg-light rounded">
                    <h4>Consulta:</h4>
                    <div>
                        <label className="form-label mx-2" htmlFor="inBusca">Procurar funcionarios por: </label>
                        <select name="buscaTipo" id="buscaTipo">
                            <option value="n">Nome</option>
                            <option value="t">Turno</option>
                        </select>
                        <input className="form-control" type="text" name="inBusca" id="inBusca"
                            value={busca || ""} onChange={(e) => setBusca(e.target.value)}
                            onKeyUp={(e) => { if (e.key === "Enter") ExecutarConsulta(); }} />
                    </div>
                    <button className="btn btn-info btn-sm m-2" onClick={() => ExecutarConsulta()}>Procurar</button>
                    <button className="btn btn-info btn-sm m-2" onClick={() => GetTodosFuncionarios()}>Ver Todos</button>
                </div>
                {buscaExecutada ?
                    (funcionarios.some(_ => true)
                        ? <div>
                            <h4>Resultado: {funcionarios.length} encontrados</h4>
                            <table className="table table-light m-2">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Contato</th>
                                        <th>Turno</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {funcionarios.map((f, i) => {
                                        return <FuncionarioViewSimples key={i} fc={f} turnos={turnos} />;
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : <h4 className="p-2 m-auto w-50 rounded bg-warning text-center">Nenhum funcionario encontrado</h4>) : ""}
                <button className="btn btn-primary btn-lg" onClick={() => navigate(-1)}>Voltar</button>
            </div>
        </>
    );
}

export default GerenciarFuncionarios;
