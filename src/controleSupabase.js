import { createClient } from "@supabase/supabase-js";

export const controleBD = createClient(process.env.REACT_APP_SUPABASE_SERVER, process.env.REACT_APP_SUPABASE_KEY);