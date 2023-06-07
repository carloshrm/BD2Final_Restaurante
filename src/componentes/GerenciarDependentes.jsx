import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import DependenteView from "./DependenteView";
import DependentesForm from "./DependentesForm";

function GerenciarDependentes({ fkFuncionario }) {
    const [dep, setDep] = useState([]);
    const [mostraCadastro, setMostraCadastro] = useState(false);
    const [erro, setErro] = useState(undefined);

    useEffect(() => {
        if (fkFuncionario)
            LerDependentes();
    }, []);

    function LerDependentes() {
        controleBD.from("dependente").select("*").eq("fk_funcionario_numcarteirat", fkFuncionario).then(({ data }) => {
            setDep(data);
        });
    }

    async function RemoverDependente(fk, dt) {
        const { error } = await controleBD
            .from('dependente')
            .delete()
            .eq('fk_funcionario_numcarteirat', fk)
            .eq('dtnascimento', dt);

        if (error)
            console.log(error);
        else {
            LerDependentes();
        }
    }

    async function CadastrarDependente() {
        const nomeEl = document.getElementById("depnome");
        const parEl = document.getElementById("deppar");
        const nascEl = document.getElementById("depnasc");
        const telEl = document.getElementById("deptel");
        const telLimpo = telEl.value.replace(/\D/g, '');

        const { error } = await controleBD
            .from('dependente')
            .insert(
                {
                    dtnascimento: nascEl.value,
                    fk_funcionario_numcarteirat: fkFuncionario,
                    nome: nomeEl.value,
                    parentesco: parEl.value,
                    telefone: telLimpo,
                });
        if (!error) {
            setMostraCadastro(false);
            LerDependentes();
        }
        else
            setErro("Ocorreu um erro no cadastro, verifique as informações e tente novamente.");
    }

    return (
        <div className="px-4 py-2 bg-info-subtle rounded">
            <h4>Dependentes: {dep.length}</h4>
            <div className="table-responsive">
                {dep.some(_ => true) ?
                    <table className="table table-light">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Idade</th>
                                <th>Parentesco</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dep.map((dp, i) =>
                                <DependenteView
                                    key={i}
                                    dep={dp}
                                    atualizarLista={LerDependentes}
                                    removerCallback={() => RemoverDependente(dp.fk_funcionario_numcarteirat, dp.dtnascimento)}
                                />)}
                        </tbody>
                    </table>
                    : ""}
            </div>
            <div>
                <button type="button" onClick={() => setMostraCadastro(!mostraCadastro)} className="btn btn-info">Adicionar Dependente</button>
                {mostraCadastro ?
                    <DependentesForm>
                        {erro ? erro : ""}
                        <button type="button" className="btn btn-primary m-2" onClick={() => CadastrarDependente()}>Cadastrar</button>
                    </DependentesForm> : ""}
            </div>
        </div>
    );
}

export default GerenciarDependentes;
