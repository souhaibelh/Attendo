import {supabase} from '../../lib/supabaseClient'

export async function getStudentsWithGroup(ue) {
    const {data, error} = await supabase.from('student').select('*, pae!inner(group)').eq('pae.ue', ue)

    if (error) {
        console.error("There was a problem fetching", error.message, error.details)
    }

    return data
}