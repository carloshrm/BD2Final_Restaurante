import { useEffect } from "react";

function DependentesForm({ dep, children }) {

    useEffect(() => {
        if (dep) {
            document.getElementById("depnome").value = dep.nome;
            document.getElementById("deppar").value = dep.parentesco;
            document.getElementById("depnasc").value = dep.dtnascimento;
            document.getElementById("deptel").value = dep.telefone;
        }
    });

    return (
        <div className={`container-sm ${dep ? "bg-warning" : "bg-light"} p-2`} >
            <label htmlFor="depnome" className="form-label">Nome</label>
            <input required type="text" name="depnome" id="depnome" className="form-control" />

            <label htmlFor="depnasc" className="form-label">Data de nascimento: </label>
            <input required type="date" name="depnasc" id="depnasc" className="form-control" />

            <label htmlFor="deptel" className="form-label">Telefone</label>
            <input required type="text" name="deptel" id="deptel" className="form-control" />

            <label htmlFor="deppar" className="form-label">Parentesco</label>
            <input required type="text" name="deppar" id="deppar" className="form-control" />
            {children}
        </div>
    );
}

export default DependentesForm;