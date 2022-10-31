<template>
    <div>
        <h3>Latest Podcast episodes</h3>
        <NuxtLink class="text-blue-500" to="/podcast">View all episodes</NuxtLink>
        <div v-if="!errorMessage && latestEpisodes">
            <PodcastEpisode v-for="episode in latestEpisodes" :key="episode.title" :episodeData="episode" />
        </div>
        <div v-else-if="errorMessage">
            <p>{{ errorMessage }}</p>
        </div>
        <FullLoader v-else />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FullLoader from '~/components/layout/fullLoader.vue';
import PodcastEpisode from '../episode.vue'

import { EpisodeDTO } from '~/pages/podcast/index.vue';

type Data = {
    latestEpisodes: null | EpisodeDTO[]
    errorMessage: null | string
}

export default Vue.extend({
    name: "RecentPodcastEpisodes",
    components: { FullLoader, PodcastEpisode },
    data(): Data {
        return {
            latestEpisodes: null,
            errorMessage: null
        }
    },
    methods: {
        async fetchLatestEpisodes() {
            this.latestEpisodes = (await this.$content("podcasts").sortBy('date', 'desc').limit(3).fetch()) as any as EpisodeDTO[];
        },
    },
    async created() {
        await this.fetchLatestEpisodes();
    }
});
</script>