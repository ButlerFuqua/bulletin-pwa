<template>
    <div>
        <h1>Reset Password</h1>
        <input type="password">
        <input type="password">
        <button>Reset and login</button>
        <div>
            <p>Never mind</p>
            <NuxtLink to="/entry/login">
                Login
            </NuxtLink>
            <NuxtLink to="/entry/signup">
                Sign up
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
export default Vue.extend({
    name: 'LoginPage',
    layout: 'entry',
    methods: {
        async login() {
            try {
                const response = await axios.post(`/api/login`, {
                    email: `butlerfuqua@gmail.com`,
                    password: `password1`
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        },
        async resetPassword() {
            try {
                const response = await axios.post(`/api/reset`, {
                    password1: `new_password1`,
                    password2: `new_password1`,
                });
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        },
        async resetAndLogin() {
            await this.resetPassword();
            await this.login();
            // todo redirect
        }
    },
    created() {
        // get accessToken and email from query
        const { hash } = this.$nuxt.$route
        console.log('RESET PAGE', hash)


        /**
         Reset hash example
         #access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY3NDA2MjgwLCJzdWIiOiIwMmM2OWVkZS04ZGE2LTQ0MWEtYTc0Zi1mYjJlOTY1MDUwMzciLCJlbWFpbCI6ImJ1dGxlcmZ1cXVhK3VzZXIxQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsib3JnYW5pemF0aW9uIjoiZGVtbyIsInVzZXJuYW1lIjoidW5pcXVldXNlcm5hbWUxIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6IjgxYjgxNmUzLTQ1YzktNDEzOC05Y2VlLTA5YzI3YzAxNDY4ZCJ9.AEw7h2-xILHP1zUKYgeIrTGdzOnzig0PUoUNuTws6MY&expires_in=3600&refresh_token=MjBjSF8Ah7iu96L5HPfLsg&token_type=bearer&type=recovery
         */

    }
})
</script>