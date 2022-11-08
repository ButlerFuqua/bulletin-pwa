<template>
    <div class="bg-gray-100 relative">
        <MainNav />
        <div class="container xl m-auto ">
            <nuxt />
        </div>
        <BottomBar />
        <Toaster />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MainNav from '~/components/layout/mainNav.vue'
import BottomBar from '~/components/layout/bottomBar.vue'
import Toaster from '~/components/layout/toaster.vue';

type Data = {

}

export default Vue.extend({
    name: 'DefaultLayout',
    head: {},
    components: { MainNav, BottomBar, Toaster },
    data(): Data {
        return {

        }
    },
    methods: {},
    async created() {

    }
})
</script>