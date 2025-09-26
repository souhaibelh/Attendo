import { defineStore } from 'pinia'
import { supabase } from '../../lib/supabaseClient'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            currentUser: null,
        }
    },
    actions: {
        // methode pour log in
        async login() {
            const { error } = await supabase.auth.signInWithOAuth({provider: 'google',})
        
            if (error) {
                console.error("Couldn't sign in: " + error)
            }
        },
        async logout() {
            await supabase.auth.signOut()
        },
        async getUser() {
            return (await supabase.auth.getUser()).data.user
        },
        init(router) {
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
                    this.currentUser = null;
                    // si on a sign out et que la route demande cest la route protege /session/** alors on va dans le home
                    if (router.currentRoute.value.path.startsWith('/session')) {
                        router.push({name: 'home'})
                    }
                }
            });

            supabase.auth.getUser().then(({ data: { user }, error }) => {
                if (user) {
                    this.currentUser = user;
                } else {
                    this.currentUser = false;
                }
            });
        }
    }
})