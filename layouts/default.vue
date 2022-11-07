<template>
    <div class="bg-gray-100">
        <MainNav :userData="userData?.user_metadata || null" />
        <div class="container xl m-auto h-full">
            <nuxt />
        </div>
        <BottomBar />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserResponse } from '~/types/user'
import MainNav from '~/components/layout/mainNav.vue'
import BottomBar from '~/components/layout/bottomBar.vue'

type Data = {
    userData: null | UserResponse
}

export default Vue.extend({
    name: 'DefaultLayout',
    head: {},
    components: { MainNav, BottomBar },
    data(): Data {
        return {
            userData: null
        }
    },
    methods: {},
    async created() {

    }
})
</script>