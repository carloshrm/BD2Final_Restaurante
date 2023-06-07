import { useState } from "react";
import { controleBD } from "../controleSupabase";
import ProdutoView from "./ProdutoView";
import './PratoView.css';

function PratoView({ prato, produtos, removerCallback, atualizarLista }) {
    const [mostraRemove, setMostraRem] = useState(false);
    const [mostraEdit, setMostraEdit] = useState(false);
    const [mostraProdutos, setMostraProdutos] = useState(false);

    const [produtosAdicionados, setProdsAdicionados] = useState([]);
    const [pratoLocal, setPratoLocal] = useState({});
    const [erroUpd, setErroUpd] = useState(undefined);

    useState(() => {
        setPratoLocal(prato);
    }, []);

    async function ConfirmaEdicao() {
        const nome = document.getElementById("editnome").value;
        const precoString = document.getElementById("editpreco").value;
        const preco = parseFloat(precoString);
        if (isNaN(preco)) {
            setErroUpd("Preço invalido.");
            return;
        }
        const { error } = await controleBD
            .from('prato')
            .update({
                nomeprato: nome,
                preco: preco,
            })
            .eq('numero', prato.numero);

        if (error) {
            setErroUpd("Ocorreu um erro, verifique as informações e tente novamente.");
            console.log(error);
        } else {
            setMostraEdit(false);
            atualizarLista();
        }
    }

    async function RemoverProduto(prnum, pdtcod) {
        const { error } = await controleBD
            .from('criarprato')
            .delete()
            .eq('fk_prato_numero', prnum)
            .eq('fk_produto_codigo', pdtcod);

        if (error) {
            setErroUpd("Ocorreu um erro, verifique as informações e tente novamente.");
            console.log(error);
        } else {
            setPratoLocal(p => { return { ...p, produtos: pratoLocal.produtos.filter(pdt => pdt.codigo != pdtcod) }; });
        }
    }

    async function AdicionarProduto() {
        const selecionado = document.getElementById("prodsel").value;

        const { error } = await controleBD
            .from('criarprato')
            .insert(
                {
                    fk_produto_codigo: selecionado,
                    fk_prato_numero: prato.numero
                });
        if (error) {
            setErroUpd("Ocorreu um erro, verifique as informações e tente novamente.");
            console.log(error);
        } else {
            setPratoLocal(p => { return { ...p, produtos: pratoLocal.produtos.concat(produtos.find(pdt => pdt.codigo == selecionado)) }; });
        }
    }

    return (
        <>
            <tr>
                <td>{pratoLocal.numero}</td>
                <td>
                    {mostraEdit ? <input type="text" name="editnome" id="editnome" value={pratoLocal.nomeprato} onChange={(e) => setPratoLocal({ ...pratoLocal, nomeprato: e.target.value })} /> : <span>{pratoLocal.nomeprato}</span>}
                </td>
                <td>
                    {mostraEdit ? <div>R$ <input type="number" step={"0.01"} name="editpreco" id="editpreco" value={pratoLocal.preco} onChange={(e) => setPratoLocal({ ...pratoLocal, preco: e.target.value })} /> </div> : <span>R$ {pratoLocal.preco}</span>}
                </td>
                <td className="d-flex flex-grow-1">
                    <button className="btn mx-2 btn-secondary btn-sm" onClick={() => setMostraProdutos(!mostraProdutos)}>Ver Produtos</button>
                    <button className={`btn mx-2 btn-${mostraEdit ? "success" : "warning"} btn-sm`} onClick={() => {
                        if (mostraEdit) {
                            ConfirmaEdicao();
                        }
                        setMostraEdit(!mostraEdit);
                        setErroUpd("");
                    }}>{mostraEdit ? "OK!" : "Editar"}</button>
                    {mostraEdit ?
                        <button className="btn mx-2 btn-outline-dark btn-sm" onClick={() => {
                            setMostraEdit(!mostraEdit);
                        }}>Cancelar</button>
                        : ""}
                    <button type="button" onClick={() => setMostraRem(!mostraRemove)} className="btn btn-danger mx-auto btn-sm">Remover</button>
                </td>
            </tr>
            {mostraProdutos ?
                <>
                    {pratoLocal.produtos.map((p, i) => <ProdutoView key={i} p={p} remo={mostraEdit ? (() => RemoverProduto(pratoLocal.numero, p.codigo)) : null} />)}
                    {mostraEdit ?
                        <tr>
                            <td colSpan={2}>
                                <p>Adicionar produto: </p>
                                <select name="prodsel" id="prodsel">
                                    {produtos.map((p, i) => {
                                        if (pratoLocal.produtos.some(pl => pl.codigo === p.codigo))
                                            return "";
                                        else
                                            return <option key={i} value={p.codigo}>Nome: {p.nome} Preço: R$ {p.precoproduto}</option>;
                                    })}
                                </select>
                                <button className="btn btn-success btn-sm mx-2" onClick={() => AdicionarProduto()}>Adicionar</button>
                            </td>
                            <td colSpan={2}></td>
                        </tr> : ""}
                </>
                : ""}
            {mostraRemove ?
                <tr>
                    <td className="bg-danger text-white fw-bold" colSpan={10}>
                        <p>Tem certeza que deseja remover esse prato?</p>
                        <button className="btn mx-2 btn-warning btn-sm" onClick={() => { setMostraRem(false); removerCallback(); }}>Sim</button>
                        <button className="btn mx-2 btn-light btn-sm" onClick={() => setMostraRem(false)}>Nao</button>
                    </td>
                </tr>
                : ""}
            {erroUpd ?
                <tr>
                    <td colSpan={10} className="bg-danger text-white fw-bold">{erroUpd}</td>
                </tr>
                : ""}
            <tr>
                <td colSpan={10} className="bg-light py-2 "></td>
            </tr>
        </>
    );
}

export default PratoView;