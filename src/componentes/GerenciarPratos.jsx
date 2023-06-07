import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import PratoView from "./PratoView";
import PratoForm from "./PratoForm";

function GerenciarPratos() {
    const [produtos, setProdutos] = useState([]);
    const [pratos, setPratos] = useState([]);
    const [criarPrato, setCriaPrato] = useState([]);
    const [mostraCadastro, setMostraCadastro] = useState(false);
    const [erro, setErro] = useState(undefined);

    useEffect(() => {
        LerPratos();
    }, []);

    async function LerPratos() {
        setMostraCadastro(false);
        if (pratos !== [])
            setPratos([]);

        const { data: pratosInfo } = await controleBD.from("prato").select("*").order("numero", { ascending: true });
        const { data: produtosInfo } = await controleBD.from("produto").select("*");
        const { data: criaInfo } = await controleBD.from("criarprato").select("*");

        if (pratosInfo && produtosInfo && criaInfo) {
            setProdutos(produtosInfo);
            setCriaPrato(criaInfo);
            const resultado = pratosInfo.map(pr => {
                return {
                    ...pr, produtos: produtosInfo.filter(pdt => {
                        return criaInfo.some(pt => pt.fk_produto_codigo === pdt.codigo && pt.fk_prato_numero === pr.numero);
                    })
                };
            });
            setPratos(resultado);
        }
    }

    async function RemoverPrato(num) {
        const { error: rmCriar } = await controleBD
            .from('criarprato')
            .delete()
            .eq('fk_prato_numero', num);

        if (rmCriar) {
            console.log(rmCriar);
            return;
        }

        const { error: rmPrato } = await controleBD
            .from('prato')
            .delete()
            .eq('numero', num);

        if (rmPrato) {
            console.log(rmPrato);
            return;
        }
        else {
            LerPratos();
        }
    }

    return (
        <div className="container-xl px-4 py-2 my-4 bg-light rounded">
            <h4>Pratos: {pratos.length}</h4>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Nome</th>
                            <th>Preco</th>
                            <th></th>
                        </tr>
                    </thead>
                    {pratos.some(_ => true)
                        ?
                        <tbody>
                            {pratos.map((p, i) =>
                                <PratoView key={i} prato={p} produtos={produtos} atualizarLista={LerPratos} removerCallback={() => RemoverPrato(p.numero)} />)}
                        </tbody>
                        : ""}
                </table>
            </div>
            <div>
                <button type="button" onClick={() => setMostraCadastro(!mostraCadastro)} className="btn btn-secondary btn-lg">Novo Prato</button>
                {mostraCadastro ?
                    <PratoForm produtos={produtos} n={pratos.length} atualizar={() => LerPratos()} />
                    : ""}
            </div>
        </div>
    );
}

export default GerenciarPratos;
