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
        init() {
            supabase.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN') {
                  supabase.auth.getUser()
                    .then(({ data: {user} }) => {
                      this.currentUser = user;
                    })
                    .catch((error) => {
                      console.error("Error getting user data:", error.message);
                    });
                } else if (event === 'SIGNED_OUT') {
                  console.log("signed out");
                  this.currentUser = null;
                }
            });

            supabase.auth.getUser().then(({ data: { user }, error }) => {
                if (user) {
                    this.currentUser = user;
                } else {
                    this.currentUser = false;
                }
                this.isLoading = false;
            });
        }
    }
})