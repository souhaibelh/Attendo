import { supabase } from '../../lib/supabaseClient'

function getAll() {
    return supabase.from('session').select()
}

async function add(label) {
    const { error } = await supabase.from('session').insert({label: label})

    if (error) {
        console.error('Error adding this session')
    }
}