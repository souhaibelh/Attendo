import {supabase} from '../../lib/supabaseClient'

export async function getStudentsWithGroup(ue, exId) {
    const {data, error} = await supabase.from('student').select('*, pae!inner(group), examination(*)').eq('pae.ue', ue).eq('examination.examination_room', exId)

    if (error) {
        console.error("There was a problem fetching", error.message, error.details)
    }

    return data
}