import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Erro() {
    const nav = useNavigate();

    useState(() => {
        setTimeout(() => nav('/'), 1000);
    });

    return (
        <div className="d-flex bg-light align-items-center m-auto p-4 border border-light border-2 rounded">
            <h2>Voltando para a pagina inicial...</h2>
        </div>
    );
}

export default Erro;