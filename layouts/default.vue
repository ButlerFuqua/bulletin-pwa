<template>
    <div class="bg-gray-100 relative h-full">
        <MainNav />
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

}

export default Vue.extend({
    name: 'DefaultLayout',
    head: {},
    components: { MainNav, BottomBar },
    data(): Data {
        return {

        }
    },
    methods: {},
    async created() {

    }
})
</script>