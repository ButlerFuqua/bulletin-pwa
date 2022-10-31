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
export default Vue.extend({
    name: 'LoginPage',
    layout: 'entry'
})
</script>