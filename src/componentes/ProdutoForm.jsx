import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

function ProdutoForm() {
    const navigate = useNavigate();
    let { state } = useLocation();

    const [infoProduto, setInfoProds] = useState({});
    const [confDel, setConfDel] = useState(false);
    const [infoOriginal, setOriginal] = useState({});
    const [msg, setMsg] = useState(undefined);

    useEffect(() => {
        PopularFormulario();
    }, []);

    async function PopularFormulario() {
        if (state.prod.codigo) {
            const { data, error } = await controleBD.from("produto").select("*").eq("codigo", state.prod.codigo);
            if (!error) {
                setOriginal(data[0]);
                setInfoProds(data[0]);
            } else
                console.log(error);
        } else {
            setOriginal(state.prod);
            setInfoProds(state.prod);
        }
    }

    async function AtualizarBanco() {
        const { error: updProduto } = await controleBD
            .from('produto')
            .update([
                {
                    codigo: infoProduto.codigo,
                    nome: infoProduto.nome,
                    precoproduto: infoProduto.precoproduto,
                }])
            .eq('codigo', infoProduto.codigo);

        if (updProduto) {
            console.log(updProduto);
            return;
        }
    }

    async function DeleteProduto() {
        const { error } = await controleBD
            .from('produto')
            .delete()
            .eq('codigo', infoProduto.codigo);
        if (error)
            console.log(error);
        else {
            setMsg("Produto deletado com sucesso. Redirecionando...");
            setTimeout(() => navigate(state.prod.propria ? '/' : -1), 2000);
        }
    }

    return (
        <div className="container-x1">
            <form id="form-editarP" className="d-flex flex-column align-items-start p-2 mx-auto bg-light rounded border border-4" onSubmit={(e) => e.preventDefault()}>
                <div className="row m-2">
                    <h4>Informações do produto</h4>

                    <div className="col-auto">
                        <label htmlFor="edt-nome" className="form-label">Nome</label>
                        <input required type="text" name="edt-nome" id="edt-nome" className="form-control"
                            value={infoProduto.nome || ""} onChange={(e) => setInfoProds(u => ({ ...u, nome: e.target.value }))} />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="edt-precoproduto" className="form-label">Preço</label>
                        <input required type="number" name="edt-precoproduto" id="edt-precoproduto" className="form-control"
                            value={infoProduto.precoproduto || ""} onChange={(e) => setInfoProds(u => ({ ...u, precoproduto: e.target.value }))} />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="edt-codigo" className="form-label">Codigo</label>
                        <input disabled type="number" name="edt-codigo" id="edt-codigo" className="form-control"
                            value={infoProduto.codigo || ""} onChange={(e) => setInfoProds(u => ({ ...u, codigo: e.target.value }))} />
                    </div>
                </div>

                <div className="m-auto">
                    <button className="btn btn-primary mx-2" type="button" onClick={() => AtualizarBanco()}>Salvar</button>
                    <button className="btn btn-dark mx-2" onClick={() => navigate(-1)}>Cancelar</button>
                    <button type="button" className="btn btn-warning mx-5" onClick={() => setConfDel(!confDel)}>Excluir</button>
                </div>

                {confDel ?
                    <div>
                        <p>Tem certeza que deseja excluir este produto?</p>
                        <button type="button" className='btn btn-warning mx-2 btn-sm' onClick={() => DeleteProduto()}>Excluir</button>
                        <button type="button" className="btn btn-light mx-2 btn-sm" onClick={() => setConfDel(false)}>Cancelar</button>
                    </div> : ""}
            </form>
            {msg !== undefined ?
                <div className="position-fixed top-50 start-50 translate-middle bg-success shadow border border-2 p-4">
                    <h4 className="text-white">{msg}</h4>
                </div> : ""}
        </div>
    );

}

export default ProdutoForm;