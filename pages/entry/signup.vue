<template>
    <div>
        <h1>Signup</h1>
        <NuxtLink to="/entry/login">
            Log in
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