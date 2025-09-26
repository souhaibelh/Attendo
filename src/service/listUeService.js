import { supabase } from '../../lib/supabaseClient'

export async function getAll() {
    const { data, error } = await supabase.from('ue').select();

    if (error) {
        console.error("Error fetching students:", error.message);
        return [];
    }
    
    return data;
}