import { defineStore } from 'pinia'
import { supabase } from '../../lib/supabaseClient'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            currentUser: null,
            isLoading: true,
        }
    },
    actions: {
        async login() {
            const { error } = await supabase.auth.signInWithOAuth({provider: 'google',})
        
            if (error) {
                console.error("Couldn't sign in: " + error)
            }
        },
        async logout() {
            await supabase.auth.signOut()
        },
        async init() {
            supabase.auth.onAuthStateChange(async (event, session) => {
                if (event === 'SIGNED_IN') {
                    const { data, error } = await supabase.auth.getUser()
                    console.log(data.user)
                    if (error) {
                        console.error("Error signing in")
                    } else {
                        this.currentUser = data.user
                    }
                } else if (event === 'SIGNED_OUT') {
                    console.log("here")
                    this.currentUser = null
                } else if (event === 'INITIAL_SESSION') {
                    console.log(event)
                }
            })
            const { data, error } = await supabase.auth.getUser()
            if (data.user) {
                this.currentUser = data.user
            } else {
                this.currentUser = null
                this.isLoading = false
            }
        }
    }
})