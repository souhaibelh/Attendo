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
    
    data.forEach((data) => {
        supabase.from('examination').select('*', { count: 'exact' }).eq('examination_room', data.examination_room.at(0).id).then((response) => {
            data.currentStudents = response.count
        })
    })

    const promises = data.map((item) => {
        return supabase.from('examination').select('*', {count: 'exact'}).eq('examination_room', item.examination_room.at(0).id).then((response) => item.currentStudents = response.count)
    })

    await Promise.all(promises)

    return data
}