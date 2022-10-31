<template>
    <div id="sidebar" class="w-100 md:w-96 lg:w-2/5 p-2">
        <!-- <SiteInfo class="siteInfoWidget my-3" v-if="landingPageContent !== 'info'" /> -->
        <RecentUpdates class="my-3" v-if="landingPageContent !== 'updates'" />
        <RecentPodcasts class="my-3" v-if="landingPageContent !== 'podcast'" />
        <!-- <RecentArticles class="my-3" v-if="landingPageContent !== 'articles'" /> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SiteInfo from '../widgets/siteInfo/siteInfo.vue';
import RecentArticles from '../widgets/articles/recentArticles/recentArticles.vue';
import RecentPodcasts from '../widgets/podcast/recentPodcasts/recentPodcasts.vue';
import RecentUpdates from '../widgets/updates/recentUpdates/recentUpdates.vue';
export default Vue.extend({
    name: "Sidebar",
    props: ["landingPageContent"],
    components: { RecentPodcasts, RecentArticles, SiteInfo, RecentUpdates }
})
</script>

<style lang="scss" scoped>
.siteInfoWidget {
    @media (max-width: 767px) {
        display: none;
    }
}
</style>