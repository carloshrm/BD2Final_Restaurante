import { useEffect, useLayoutEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";


import GerenciarDependentes from "./GerenciarDependentes";
import FotoUsuario from "./FotoUsuario";
import GerenciarBeneficios from "./GerenciarBeneficios";

function FuncionarioForm() {

    const navigate = useNavigate();
    let { state } = useLocation();

    const [infoUsuario, setInfoUsuario] = useState({});
    const [confDel, setConfDel] = useState(false);
    const [infoOriginal, setOriginal] = useState({});
    const [msg, setMsg] = useState(undefined);

    useEffect(() => {
        PopularFormulario();
    }, []);

    async function PopularFormulario() {
        if (state.user.id) {
            const { data, error } = await controleBD.from("funcionario_completo").select("*").eq("id", state.user.id);
            if (!error) {
                setOriginal(data[0]);
                setInfoUsuario(data[0]);
            } else
                console.log(error);
        } else {
            setOriginal(state.user);
            setInfoUsuario(state.user);
        }
    }

    async function AtualizarBanco() {
        const { error: updFuncionario } = await controleBD
            .from('funcionario')
            .update([
                {
                    numcarteirat: infoUsuario.numcarteirat,
                    telefone: infoUsuario.telefone,
                    datanasc: moment(infoUsuario.datanasc).format("YYYY-MM-DD"),
                    fk_turno_s__turno_s__pk: infoUsuario.fk_turno_s__turno_s__pk,
                    salario: infoUsuario.salario,
                    endereco: infoUsuario.endereco,
                    rg: infoUsuario.rg,
                    horasextras: infoUsuario.horasextras,
                    aumento: infoUsuario.aumento,
                    faltas_mes: infoUsuario.faltas_mes,
                    valetransporte: infoUsuario.valetransporte,
                }])
            .eq('rg', infoOriginal.rg);

        if (updFuncionario) {
            console.log(updFuncionario);
            return;
        }

        const { error: updCurriculo } = await controleBD
            .from('curriculo')
            .update([
                {
                    nome: infoUsuario.nome,
                    rg: infoUsuario.rg,
                    telefone: infoUsuario.telefone,
                    numcarteira: infoUsuario.numcarteirat
                }])
            .eq('rg', infoOriginal.rg);

        if (updCurriculo) {
            console.log(updCurriculo);
            return;
        }

        const { error: updContrata } = await controleBD
            .from('contrata')
            .update([
                {
                    datacontratamento: moment().format("YYYY-MM-DD"),
                    rgpessoa: infoUsuario.rg,
                    numcarteira: infoUsuario.numcarteirat
                }])
            .eq('rgpessoa', infoOriginal.rg);

        if (updContrata) {
            console.log(updContrata);
            return;
        }
        setMsg("Alterações realizadas com sucesso! Redirecionando...");
        setTimeout(() => navigate(state.user.propria ? '/' : -1), 2000);
    }

    async function DeleteUsuario() {
        const { error } = await controleBD
            .from('funcionario')
            .delete()
            .eq('rg', infoUsuario.rg);
        if (error)
            console.log(error);
        else {
            setMsg("Funcionário excluido com sucesso. Redirecionando...");
            setTimeout(() => navigate(state.user.propria ? '/' : -1), 2000);
        }
    }

    return (
        <div className="container p-2 mx-auto bg-light rounded border border-4">
            <h4 className="m-4 fw-bold">Editando as informações do {state.user.propria ? "seu cadastro" : `cadastro de: ${infoUsuario.nome}`} </h4>
            <form id="form-editar" className="d-flex flex-column align-items-start " onSubmit={(e) => e.preventDefault()}>

                <FotoUsuario c={state.user} />
                <div className="row m-2">
                    <h4>Informações basicas</h4>

                    <div className="col-auto">
                        <label htmlFor="edt-nome" className="form-label">Nome completo</label>
                        <input required type="text" name="edt-nome" id="edt-nome" className="form-control"
                            value={infoUsuario.nome || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, nome: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-nasc" className="form-label">Data de nascimento</label>
                        <input required type="date" name="edt-nasc" id="edt-nasc" className="form-control"
                            value={infoUsuario.datanasc || new Date()} onChange={(e) => setInfoUsuario(u => ({ ...u, datanasc: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-rg" className="form-label">RG</label>
                        <input disabled type="text" name="edt-rg" id="edt-rg" className="form-control"
                            value={infoUsuario.rg || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, rg: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-carteira" className="form-label">Carteira de Trabalho</label>
                        <input disabled type="text" name="edt-carteira" id="edt-carteira" className="form-control"
                            value={infoUsuario.numcarteirat || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, numcarteirat: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                </div>

                <div className="row m-2">
                    <h4>Contato</h4>

                    <div className="col-auto">
                        <label htmlFor="edt-tel" className="form-label">Telefone</label>
                        <input required minLength={8} type="text" name="edt-tel" id="edt-tel" className="form-control"
                            value={infoUsuario.telefone || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, telefone: e.target.value.replace(/\D/g, '') }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-end" className="form-label">Endereço</label>
                        <input required type="text" name="edt-end" id="edt-end" className="form-control"
                            value={infoUsuario.endereco || ""} onChange={(e) => setInfoUsuario(u => ({ ...u, endereco: e.target.value }))} />
                    </div>

                    <div className="col-auto">
                        <label htmlFor="edt-email" className="form-label">Email</label>
                        <input type="email" name="edt-email" id="edt-email" className="form-control"
                            defaultValue={state.user.email || ""} disabled />
                    </div>

                </div>

                {infoUsuario.numcarteirat ?
                    <div className="row mx-auto my-2 w-75">
                        <GerenciarDependentes fkFuncionario={infoUsuario.numcarteirat} />
                    </div>
                    : ""}

                {infoUsuario.numcarteirat ?
                    <div className="row mx-auto my-2 w-75">
                        <GerenciarBeneficios usuario={infoUsuario} />
                    </div>
                    : ""}

                <div className="row m-4 bg-warning-subtle rounded p-4 border border-warning">
                    <h4>Informações restritas</h4>
                    {infoUsuario.eGerente ? "" : <h6 className="text-danger">Você não tem autorização para alterar estas informações.</h6>}
                    <div className="row m-4">
                        <div className="col-auto">
                            <label htmlFor="edt-sal">Salario</label>
                            <div className="d-flex align-items-center">
                                <span>R$</span>
                                <input disabled={!infoUsuario.eGerente} required type="text" name="edt-sal" id="edt-sal" className="form-control"
                                    value={infoUsuario.salario || 0} onChange={(e) => infoUsuario.eGerente ? setInfoUsuario(i => ({ ...i, salario: e.target.value.replace(/\D/g, '') })) : ""} />
                            </div>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="edt-aumento">Aumento</label>
                            <div className="d-flex align-items-center">
                                <span>R$</span>
                                <input disabled={!infoUsuario.eGerente} required type="text" name="edt-aumento" id="edt-aumento" className="form-control"
                                    value={infoUsuario.aumento || 0} onChange={(e) => infoUsuario.eGerente ? setInfoUsuario(i => ({ ...i, aumento: e.target.value.replace(/\D/g, '') })) : ""} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto">
                            <label htmlFor="edt-data-contr" className="form-label">Data de contratação</label>
                            <input disabled type="date" name="edt-data-contr" id="edt-data-contr" className="form-control"
                                defaultValue={infoUsuario.datacontratamento ?? new Date()} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-auto bg-light border border-2 p-2 my-4 d-flex align-items-center">
                            <label htmlFor="edt-faltas" className="form-label">Faltas no mes</label>
                            <input disabled type="number" name="edt-faltas" id="edt-faltas" className="form-control"
                                value={infoUsuario.faltas_mes || 0} />
                            {infoUsuario.eGerente ? <button className="btn btn-warning" type="button" onClick={() => setInfoUsuario(i => ({ ...i, faltas_mes: i.faltas_mes + 1 }))}>Somar +1 falta</button> : ""}
                        </div>
                    </div>
                    <div className="row p-2 border border-secondary">
                        <h4>Turno</h4>
                        <div className="d-flex">
                            <div className="form-check m-2">
                                <input className="form-check-input" type="radio" name="turno" id="manha"
                                    disabled={!infoUsuario.eGerente} defaultChecked={infoUsuario.fk_turno_s__turno_s__pk === 1}
                                    onClick={(_) => setInfoUsuario(i => ({ ...i, fk_turno_s__turno_s__pk: 1 }))} />
                                <label className="form-check-label" htmlFor="manhã">Manha</label>
                            </div>
                            <div className="form-check m-2">
                                <input className="form-check-input" type="radio" name="turno" id="tarde"
                                    disabled={!infoUsuario.eGerente} defaultChecked={infoUsuario.fk_turno_s__turno_s__pk === 2}
                                    onClick={(_) => setInfoUsuario(i => ({ ...i, fk_turno_s__turno_s__pk: 2 }))} />
                                <label className="form-check-label" htmlFor="tarde">Tarde</label>
                            </div>
                            <div className="form-check m-2">
                                <input className="form-check-input" type="radio" name="turno" id="noite"
                                    disabled={!infoUsuario.eGerente} defaultChecked={infoUsuario.fk_turno_s__turno_s__pk === 3}
                                    onClick={(_) => setInfoUsuario(i => ({ ...i, fk_turno_s__turno_s__pk: 3 }))} />
                                <label className="form-check-label" htmlFor="noite">Noite</label>
                            </div>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-auto">
                            <label htmlFor="edt-hrextra" className="form-label">Horas-extra</label>
                            <input required type="number" name="edt-hrextra" id="edt-hrextra" className="form-control"
                                value={infoUsuario.horasextras || 0} onChange={(e) => infoUsuario.eGerente && !isNaN(e.target.value) ? setInfoUsuario(i => ({ ...i, horasextras: e.target.value })) : ""} />
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-auto">
                            <label htmlFor="edt-vale" className="form-label">Vale-transporte</label>
                            <input required type="number" name="edt-vale" id="edt-vale" className="form-control"
                                value={infoUsuario.valetransporte || 0} onChange={(e) => infoUsuario.eGerente && !isNaN(e.target.value) ? setInfoUsuario(i => ({ ...i, valetransporte: e.target.value })) : ""} />
                        </div>
                    </div>
                </div>

                <div className="m-auto">
                    <button className="btn btn-primary mx-2" type='button' onClick={() => AtualizarBanco()}>Salvar</button>
                    <button className="btn btn-dark mx-2" onClick={() => navigate(-1)}>Cancelar</button>
                    <button type="button" className="btn btn-warning mx-5" onClick={() => setConfDel(!confDel)}>Excluir</button>
                </div>

                {confDel ?
                    <div className='bg-danger mx-auto my-4 text-white p-2 d-flex'>
                        <p>Tem certeza que deseja excluir este funcionário e apagar todas as suas informações do banco?</p>
                        <button type="button" className='btn btn-warning mx-2 btn-sm' onClick={() => DeleteUsuario()}>Excluir</button>
                        <button type="button" className='btn btn-light mx-2 btn-sm' onClick={() => setConfDel(false)}>Cancelar</button>
                    </div> : ""}
            </form>
            {msg !== undefined ?
                <div className="position-fixed top-50 start-50 translate-middle bg-success shadow border border-2 p-4">
                    <h4 className="text-white">{msg}</h4>
                </div> : ""}
        </div >
    );
}

export default FuncionarioForm;