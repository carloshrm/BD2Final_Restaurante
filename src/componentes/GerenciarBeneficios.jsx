import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import ViewBeneficio from "./ViewBeneficio";

function GerenciarBeneficios({ usuario }) {

    const [listaBeneficios, setListaBeneficios] = useState(null);
    const [benAtual, setBenAtual] = useState(null);

    useEffect(() => {
        controleBD.from("cltbeneficios").select("*").then(({ data: lista }) => {
            setListaBeneficios(lista);

            controleBD.from("possui").select("*").eq("fk_funcionario_numcarteirat", usuario.numcarteirat).then(({ data, error }) => {
                if (data && data[0])
                    setBenAtual(lista.find(b => b.categoria === data[0].fk_cltbeneficios_categoria));
            });
        });
    }, []);

    async function AlterarBeneficio() {
        const sel = document.getElementById("selben").value;
        setBenAtual(listaBeneficios.find(b => b.categoria === sel));
        if (benAtual) {
            const { error } = await controleBD.from("possui").update({
                fk_cltbeneficios_categoria: sel,
            }).eq("fk_funcionario_numcarteirat", usuario.numcarteirat);
            if (error)
                console.log(error);
        } else {
            const { error } = await controleBD.from("possui").insert({
                fk_cltbeneficios_categoria: sel,
                fk_funcionario_numcarteirat: usuario.numcarteirat
            });
            if (error)
                console.log(error);
        }
    }

    return (
        <div className="container-xl p-4 bg-info-subtle rounded">
            <h4>Benefício</h4>
            {benAtual ?
                <ViewBeneficio beneficio={benAtual} />
                : "Nenhum benefício definido."}
            {usuario.eGerente && listaBeneficios ?
                <div className="d-flex align-items-center">
                    <h4>Definir beneficio:</h4>
                    <select name="selben" id="selben" className="form-select">
                        {listaBeneficios.map((b, i) =>
                            <option key={i} value={b.categoria}>
                                {b.categoria}
                            </option>)}
                    </select>
                    <button className="btn btn-success" onClick={() => AlterarBeneficio()}>Confirma</button>
                </div>
                : ""}
        </div>
    );
}


export default GerenciarBeneficios;
