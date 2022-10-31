<template>
    <div class="h-full">
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
export default Vue.extend({
    name: 'DefaultLayout',
    head: {},
    components: {},
    methods: {},
    async created() { }
})
</script>