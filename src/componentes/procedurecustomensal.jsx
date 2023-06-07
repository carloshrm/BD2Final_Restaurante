import { createClient } from '@supabase/supabase-js';
import { controleBD } from '../controleSupabase';



function procedurecustomensal(){
    async function chamarProcedure() {
        try {
            const { data, error } = await controleBD.rpc('gerarcustomensal', {});
            if (error) {
                // Trate erros, se necessário
                console.error(error);
                return;
              }
          
              // Faça algo com os dados retornados, se necessário
              console.log(data);
            } catch (error) {
              // Trate erros, se necessário
              console.error(error);
            }
      }

      return(<><button  className="form-control" onClick={chamarProcedure}>Calculo custo mensal</button>
      </>);
}



export default procedurecustomensal;