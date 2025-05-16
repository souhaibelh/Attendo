import {supabase} from '../../lib/supabaseClient'

export async function has(student, examination) {
    const {count, error} = await supabase.from('examination').select('*', { count: 'exact', head:true }).eq('student', student).eq('examination_room', examination)

    if (error) {
        console.error("Error getting count", error.message, error.details)
    }

    return count > 0 ? true : false
}

export async function insert(student, examination) {
    const { data, error } = await supabase.from('examination').insert({student: student, examination_room: examination})

    if (error) {
        console.error("Error inserting row", error.message, error.details)
    }
}

export async function remove(student, examination) {
    const { data, error } = await supabase.from('examination').delete().eq('student', student).eq('examination_room', examination)

    if (error) {
        console.error("Problem removing record", error.message, error.details)
    }
}

export async function update(teacher, exId) {
    const {data, error} = await supabase.from('examination_room').update({supervisor: teacher}).eq('id', exId)

    if (error) {
        throw Error(error.message)
    }
}

export async function get(id) {
    const { data, error } = await supabase.from('examination_room').select('room, supervisor').eq('id', id)

    if (error) {
        console.error(error.message, error.details)
    }
    
    return data
} 