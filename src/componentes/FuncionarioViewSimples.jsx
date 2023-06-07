import './FuncionarioViewSimples.css';
import { useNavigate } from "react-router-dom";

function FuncionarioViewSimples({ fc, turnos }) {
    const navigate = useNavigate();


    return (
        <tr>
            <td>
                <p className='fw-bold'>{fc.nome}</p>
            </td>
            <td>
                <div>
                    <p>Telefone: {fc.telefone}</p>
                    <p>Email: {fc.email}</p>
                </div>
            </td>
            <td>
                <div className="d-flex">
                    <p>Turno: </p>
                    {turnos
                        .filter(ts => ts.turno_s__pk === fc.fk_turno_s__turno_s__pk)
                        .map((t, i) => <p key={i} className="mx-1">{t.turnos}</p>)}
                </div>
            </td>
            <td>
                <div>
                    <button className="btn btn-secondary btn-sm mx-2"
                        onClick={() => navigate('/editfunc', { state: { user: { ...fc, propria: false, eGerente: true } } })}>Editar</button>
                </div>
            </td>
        </tr>

    );
}

export default FuncionarioViewSimples;
