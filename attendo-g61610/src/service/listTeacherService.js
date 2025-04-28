import {supabase} from '../../lib/supabaseClient'

export async function getAll() {
    const {data, error} = await supabase.from('teacher').select()

    if (error) {
        console.error('Error fetching teachers', error.message, error.details)
    }

    return data
}