
function ProdutoView({ p, remo }) {

    return (
        <tr className="produto">
            <td>{p.codigo}</td>
            <td>{p.nome}</td>
            <td>R$ {p.precoproduto}</td>
            <td>{remo ?
                <button type="button" onClick={() => remo()} className="btn btn-danger btn-sm">Remover</button> : ""}
            </td>
        </tr>
    );
}

export default ProdutoView;