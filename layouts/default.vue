<template>
    <div class="h-full">
        <MainNav />
        <div class="bg-blue-500 flex sticky top-0">
            <button class="bg-white text-black border-2 border-blue-500 p-1">
                Menu
            </button>
            <div class="w-full p-1 text-center">
                <h1 class="text-lg text-white">Testimony Blog</h1>
            </div>
        </div>
        <div class="container xl m-auto h-full">
            <nuxt />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AuthMixin from '~/mixins/auth.vue'
import { UserResponse } from '~/types/user'
import MainNav from '~/components/layout/mainNav.vue'

type Data = {
    userData: null | UserResponse
}

export default Vue.extend({
    name: 'DefaultLayout',
    head: {},
    mixins: [AuthMixin],
    components: { MainNav },
    data(): Data {
        return {
            userData: null
        }
    },
    methods: {},
    async created() {
        // @ts-ignore
        const userData = await this.getUserDataIfLoggedIn();
        if (!userData.error) {
            this.userData = userData as UserResponse;
        }
    }
})
</script>