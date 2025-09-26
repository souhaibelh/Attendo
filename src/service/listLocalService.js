import {supabase} from '../../lib/supabaseClient'

export async function getAll() {
    const {data, error} = await supabase.from('room').select()

    if (error) {
        console.error("Error fetching locaux")
    }

    return data
}