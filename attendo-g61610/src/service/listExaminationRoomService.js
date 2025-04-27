import {supabase} from '../../lib/supabaseClient'

export async function add(event, room) {
    const { data, error } = await supabase.from('examination_room').insert({ event, room});

    if (error) {
        console.error("Couldn't add this examination room:", error.message, error.details);
    }
}

export async function getEventRooms(event) {
    const {data, error} = await supabase.from('room').select('*, examination_room!inner(supervisor, id)').eq('examination_room.event', event)

    if (error) {
        console.error("Error getting event", error.message, error.details)
    }

    return data
}