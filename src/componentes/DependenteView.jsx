import { useState } from "react";
import './DependenteView.css';
import DependentesForm from "./DependentesForm";
import { controleBD } from "../controleSupabase";

function DependenteView({ dep, removerCallback, atualizarLista }) {
    const [mostraRemove, setMostraRem] = useState(false);
    const [mostraEdit, setMostraEdit] = useState(false);
    const [erroUpd, setErroUpd] = useState(undefined);

    async function EditarDependente() {
        const nomeEl = document.getElementById("depnome");
        const parEl = document.getElementById("deppar");
        const nascEl = document.getElementById("depnasc");
        const telEl = document.getElementById("deptel");
        const telLimpo = telEl.value.replace(/\D/g, '');

        const { error } = await controleBD
            .from('dependente')
            .update({
                dtnascimento: nascEl.value,
                nome: nomeEl.value,
                parentesco: parEl.value,
                telefone: telLimpo,
            })
            .eq('fk_funcionario_numcarteirat', dep.fk_funcionario_numcarteirat)
            .eq('dtnascimento', dep.dtnascimento);

        if (error) {
            setErroUpd("Ocorreu um erro, verifique as informações e tente novamente.");
            console.log(error);
        } else
        {
            setMostraEdit(false);
            atualizarLista();
        }
    }

    return (
        <>
            <tr>
                <td>{dep.nome}</td>
                <td>{dep.telefone}</td>
                <td>{dep.idade}</td>
                <td>{dep.parentesco}</td>
                <td>
                    <button className="btn mx-2 btn-warning btn-sm" onClick={() => setMostraEdit(!mostraEdit)}>Editar</button>
                    <button type="button" onClick={() => setMostraRem(!mostraRemove)} className="btn btn-danger mx-2 btn-sm">Remover</button>
                </td>
            </tr>
            {mostraEdit ?
                <tr>
                    <td colSpan={4}></td>
                    <td>
                        <DependentesForm dep={dep} >
                            <button type="button" className="btn btn-primary m-2" onClick={() => EditarDependente()}>Salvar</button>
                            {erroUpd ? erroUpd : ""}
                        </DependentesForm>
                    </td>
                </tr>
                : ""}
            {mostraRemove ?
                <tr>
                    <td className="bg-danger text-white fw-bold" colSpan={10}>
                        <p>Tem certeza que deseja remover esse dependente?</p>
                        <button className="btn mx-2 btn-warning btn-sm" onClick={() => { setMostraRem(false); removerCallback(); }}>Sim</button>
                        <button className="btn mx-2 btn-light btn-sm" onClick={() => setMostraRem(false)}>Nao</button>
                    </td>
                </tr> : ""}
            <tr>
                <td colSpan={10} className="bg-info-subtle"></td>
            </tr>
        </>
    );
}

export default DependenteView;