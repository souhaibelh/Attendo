import { supabase } from '../../lib/supabaseClient'

export async function getUeInSession(session) {
    const { data, error } = await supabase.from('ue').select(`*,session_compo!inner()`).eq('session_compo.session', session)

    if (error) {
        console.error("Failed fetching: " + error)
        return []
    }

    return data
}

export async function addUeToSession(ue, session) {
    const {data, error} = await supabase.from('session_compo').insert({ ue: ue, session: session });

    if (error) {
        throw Error(error.message)
    }
}

export async function getId(ue, session) {
    const {data, error} = await supabase.from('session_compo').select('id').eq('ue', ue).eq('session', session)

    if (error) {
        console.error("Error getting id" + error)
        return '';
    }

    return data.at(0).id
}