<template>
    <div class="h-full">
        <MainNav />
        <div class="container xl m-auto h-full">
            <nuxt />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MainNav from '../components/layout/mainNav.vue'
export default Vue.extend({
    name: 'DefaultLayout',
    head: {
        // This isn't currently needed
        // script: [
        //     {
        //         type: "text/javascript",
        //         src: "https://identity.netlify.com/v1/netlify-identity-widget.js",
        //     },
        // ],
    },
    components: { MainNav },
    methods: {
        async checkUser() {
            if (!process.client)
                return
            // // @ts-ignore
            // netlifyIdentity.on('init', user => {
            //     console.log('user', user)
            // });
        }
    },
    async created() {
        await this.checkUser();
    }
})
</script>