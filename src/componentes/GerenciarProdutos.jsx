import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import ProdutoView from "./ProdutoView";
import CriarProduto from './CriarProduto';

function GerenciarProdutos() {

    const [listaProdutos, setListaProdutos] = useState([]);
    const [edit, setEdit] = useState(-1);
    const [cadastro, setCadastro] = useState(false);
    const [verForn, setVerForn] = useState(-1);
    const [listaForn, setListaForn] = useState([]);

    useEffect(() => {
        LerProdutos();
    }, []);

    async function LerProdutos() {
        setCadastro(false);
        if (listaProdutos !== [])
            setListaProdutos([]);
        controleBD.from("produto").select("*").then(({ data: lista }) => {
            setListaProdutos(lista);
        });
    }

    async function RemoverProduto(cod) {
        const { error } = await controleBD
            .from('produto')
            .delete()
            .eq('codigo', cod);
        if (error)
            console.log(error);
        else {
            setListaProdutos(listaProdutos.filter(p => p.codigo !== cod));
        }
    }

    async function ConfirmarEdicao(cod) {
        const nome = document.getElementById("editn" + cod).value;
        const preco = document.getElementById("editp" + cod).value;

        const { error } = await controleBD
            .from('produto')
            .update([
                {
                    nome: nome,
                    precoproduto: preco,
                }])
            .eq('codigo', cod);

        if (error) {
            console.log(error);
        }
        LerProdutos();
        setEdit(-1);
    }

    async function ListaFornecedores(cod) {
        const { data, error } = await controleBD
            .from('fornece')
            .select('*, fornecedor(*)')
            .eq("fk_produto_codigo", cod);
        console.log(data);
        if (error)
            console.log(error);
        else {
            setListaForn(data);
        }
    }

    return (
        <div className="container-xl p-4 bg-light rounded mx-auto my-4">
            <h4>Produtos: {listaProdutos.length}</h4>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preco</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProdutos ?
                            listaProdutos.map((p, i) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{p.codigo}</td>
                                            <td>{edit === p.codigo ?
                                                <input type="text" className="form-control" name={"editn" + p.codigo} id={"editn" + p.codigo} defaultValue={p.nome} />
                                                :
                                                (p.nome)}
                                            </td>
                                            <td>{edit === p.codigo ?
                                                <input type="number" min={0} step="0.01" className="form-control" name={"editp" + p.codigo} id={"editp" + p.codigo} defaultValue={p.precoproduto} />
                                                :
                                                ("R$ " + p.precoproduto)}
                                            </td>
                                            <td>
                                                <div>
                                                    <button onClick={() => {
                                                        ListaFornecedores(p.codigo);
                                                        setVerForn(verForn === p.codigo ? -1 : p.codigo);
                                                    }} className="btn btn-secondary btn-sm">Ver fornecedores</button>
                                                    {edit === p.codigo ? <button type="button" className="btn btn-success btn-sm mx-2" onClick={() => ConfirmarEdicao(p.codigo)}>OK!</button>
                                                        : <button type="button" onClick={() => setEdit(p.codigo)} className="btn btn-warning btn-sm mx-2">Editar</button>}

                                                    {/* <button type="button" onClick={() => RemoverProduto(p.codigo)} className="btn btn-danger btn-sm">Remover</button> */}
                                                </div>
                                            </td>
                                        </tr>
                                        {verForn === p.codigo ?
                                            <tr>
                                                {listaForn.some(_ => true) ? listaForn.map((f, i) => <td key={i}>{f.fornecedor.nome}</td>) : "Nenhum fornecedor."}
                                            </tr>
                                            :
                                            ""}
                                    </>
                                );
                            }) : ""}
                    </tbody>
                </table>
            </div>
            <button onClick={() => setCadastro(!cadastro)} className="btn btn-primary"> Cadastrar um Produto</button>
            {cadastro ?
                <div>
                    <CriarProduto n={listaProdutos.length} atualizar={() => LerProdutos()} />
                </div>
                : ""}
        </div>
    );
}


export default GerenciarProdutos;
