import { supabase } from '../../lib/supabaseClient'

export async function getAll() {
    const { data, error } = await supabase.from('session').select();

    if (error) {
        console.error("Error fetching students:", error.message);
        return [];
    }

    return data;
}

export async function get(id) {
    const { data, error } = await supabase.from('session').select().eq('id', id)
    
    if (error) {
        console.error("Error getting session")
    }

    return data.at(0)
}

export async function add(label) {
    const { data, error } = await supabase.from('session').insert({ label });

    if (error) {
        console.error('Error adding session:', error.message);
        return;
    }

    console.log('Session added successfully:', data);
}