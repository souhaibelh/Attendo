import {supabase} from '../../lib/supabaseClient'

export async function add(session_compo, label, completed = false) {
    const { data, error } = await supabase.from('event').insert({session_compo: session_compo, label: label, completed: completed})

    if (error) {
        console.error('There was an error trying to add this event' + error)
    }

    return data
}

export async function getEvents(session_compo) {
    const { data, error } = await supabase.from('event').select('label').eq('session_compo', session_compo)

    if (error) {
        console.error("There was an error trying to get this event" + error)
    }

    return data
}