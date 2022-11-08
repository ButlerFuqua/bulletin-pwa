<template>
    <div class="h-full">
        <div class="container xl m-auto h-full">
            <nuxt />
        </div>
        <Toaster />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Toaster from '~/components/layout/toaster.vue';

export default Vue.extend({
    name: 'EntryLayout',
    head: {},
    components: { Toaster },
    methods: {},
    async created() { }
})
</script>