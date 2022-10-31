<template>
    <div>
        <h1>Login</h1>
        <NuxtLink to="/entry/signup">
            Sign up
        </NuxtLink>
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
        }
    }
})
</script>