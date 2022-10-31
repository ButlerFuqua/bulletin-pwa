<template>
    <div>
        <h3>Welcome!</h3>
        <p>{{siteDescription}}</p>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';

type Data = {
    siteTitle: null | string
    siteDescription: null | string
}

export default Vue.extend({
    name: 'SiteInfoWidget',
    data(): Data {
        return {
            siteTitle: null,
            siteDescription: null
        }
    },
    methods: {
        getSiteInfo() {
            this.siteTitle = process.env.siteName || null
            this.siteDescription = process.env.siteDescription || null
        }
    },
    created() {
        this.getSiteInfo();
    }

})
</script>