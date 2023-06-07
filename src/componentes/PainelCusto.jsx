import { useEffect, useState } from "react";
import { controleBD } from '../controleSupabase';
import { useNavigate } from 'react-router-dom';


function PainelCusto(u) {
  const navigate = useNavigate();

  return (
    <>
      <button className='btn btn-info bc' onClick={() => navigate('/CustoMensal', { state: { gerente: true } })}>Veja +</button>
    </>
  );
}

export default PainelCusto;
