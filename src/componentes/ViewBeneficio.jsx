
function ViewBeneficio({beneficio}) {

    return (
        <div className="d-flex bg-light align-items-center  border border-dark border-2 rounded">
            <h4 className="m-auto p-2 fw-bold text-info-emphasis">{beneficio.categoria}</h4>
            <p className="mx-2 px-1 border-secondary">Vale-refeição: R$ {beneficio.vale_refeicao}</p>
            <p className="mx-2 px-1 border-secondary">Piso Salarial: R$ {beneficio.pisosalarial}</p>
            <p className="mx-2 px-1 border-secondary">Reajuste Salarial: R$ {beneficio.reajustesalarial}</p>
            <p className="mx-2 px-1 border-secondary">Máximo de horas-extra: {beneficio.maxhorasextras}</p>
        </div>
    );
}

export default ViewBeneficio;