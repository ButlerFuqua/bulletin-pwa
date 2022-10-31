<template>
  <div class="p-2 h-full flex flex-col md:flex-row">
    <div class="flex-grow">
      <SiteInfo v-if="landingPageContent === 'info'" />
      <RecentUpdates v-else-if="landingPageContent === 'updates'" />
      <RecentPodcasts v-else-if="landingPageContent === 'podcast'" />
      <!-- <RecentArticles v-else-if="landingPageContent === 'articles'" /> -->
    </div>
    <Sidebar :landingPageContent="landingPageContent" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RecentPodcasts from '../components/widgets/podcast/recentPodcasts/recentPodcasts.vue'
// import RecentArticles from '../components/widgets/articles/recentArticles/recentArticles.vue'
import Sidebar from '~/components/layout/sidebar.vue';
import SiteInfo from '~/components/widgets/siteInfo/siteInfo.vue';
import RecentUpdates from '~/components/widgets/updates/recentUpdates/recentUpdates.vue';

type Data = {
  title: string | null,
  description: string | null,
  landingPageContent: string | null,
}

export default Vue.extend({
  name: 'IndexPage',
  layout: 'landing',
  components: { RecentPodcasts, Sidebar, SiteInfo, RecentUpdates },
  data(): Data {
    return {
      title: null,
      description: null,
      landingPageContent: null,
    }
  },
  methods: {
  },
  async created() {
    this.title = process.env.siteName || null
    this.description = process.env.siteDescription || null
    this.landingPageContent = process.env.landingPageContent || 'info'
  }
})
</script>
