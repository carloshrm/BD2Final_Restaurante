import { useEffect, useState } from "react";
import ProdutoView from "./ProdutoView";
import { controleBD } from "../controleSupabase";

function PratoForm({ produtos, n, atualizar }) {

    const [prodSel, setProdSel] = useState([]);
    const [erro, setErro] = useState(undefined);

    useEffect(() => {
        document.getElementById("rec").innerText = "R$ " + prodSel.reduce((s, p) => s += p.precoproduto, 0).toLocaleString('pt', { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }, [prodSel]);

    async function CadastrarPrato() {
        const nome = document.getElementById("pratonome").value;
        const precoString = document.getElementById("pratopreco").value;
        const preco = parseFloat(precoString);
        const num = n + 1;

        const { error } = await controleBD
            .from('prato')
            .insert(
                {
                    numero: num,
                    nomeprato: nome,
                    preco: preco,
                });

        if (!error) {
            let erro = false;
            prodSel.forEach(async pdt => {
                const { error: erroFK } = await controleBD
                    .from('criarprato')
                    .insert(
                        {
                            fk_produto_codigo: pdt.codigo,
                            fk_prato_numero: num,
                        });
                if (erroFK) {
                    erro = true;
                    console.log(erroFK);
                }
            });
            if (!erro)
                atualizar();
        }
        else
            setErro("Ocorreu um erro no cadastro, verifique as informações e tente novamente.");
    }

    function RemoverSelecao(cod) {
        setProdSel(p => p.filter(prd => prd.codigo !== cod));
    }

    return (
        <div className="container-sm bg-light p-2">
            <div className="d-flex">
                <div>
                    <label htmlFor="pratonome" className="form-label">Nome</label>
                    <input required type="text" name="pratonome" id="pratonome" className="form-control" />
                </div>
                <div>
                    <label htmlFor="pratopreco" className="form-label">Preco </label>
                    <input required type="number" step={"0.01"} name="pratopreco" id="pratopreco" className="form-control" />
                </div>
                <div className="m-4">
                    <p>Preço minimo recomendado: </p>
                    <p id="rec">R$ 0.00</p>
                </div>
            </div>
            <div className="p-2 my-2 bg-secondary-subtle border border-2">
                <div className="w-25 table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {prodSel.map((p, i) => <ProdutoView key={i} p={p} remo={() => RemoverSelecao(p.codigo)} />)}
                        </tbody>
                    </table>
                </div>
                <label htmlFor="prodsel" className="form-label">Escolha os produtos do prato: </label>
                <div className="d-flex w-50">
                    <select name="prodsel" id="prodsel" className="form-select">
                        {produtos.map((p, i) => {
                            if (prodSel.some(pl => pl.codigo === p.codigo))
                                return "";
                            else
                                return <option key={i} value={p.codigo}>Nome: {p.nome} Preço: R$ {p.precoproduto}</option>;
                        })}
                    </select>
                    <button className="btn btn-primary" onClick={() => {
                        const selecionado = parseInt(document.getElementById("prodsel").value);
                        setProdSel(p => p.concat(produtos.find(pdt => pdt.codigo === selecionado)));
                    }}>Adicionar</button>
                </div>
            </div>
            <button className="btn btn-success" onClick={() => CadastrarPrato()}>Cadastrar</button>
        </div>
    );
}

export default PratoForm;