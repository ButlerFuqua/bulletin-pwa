<template>
    <div>
        <PageTitle title="Butler and William Podcast" />
        <ListenPodcastOn />
        <div class="p-2">
            <div v-if="episodes">
                <PodcastEpisode v-for="episode in episodes" :key="episode.id" :episodeData="episode" />
            </div>
            <FullLoader v-else />
        </div>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue'
import PageTitle from '~/components/layout/pageTitle.vue';
import FullLoader from '~/components/layout/fullLoader.vue';
import PodcastEpisode from '~/components/widgets/podcast/episode.vue'
import ListenPodcastOn from '~/components/widgets/podcast/lisentOn/listenPodcastOn.vue';

export type EpisodeDTO = {
    title: string
    id: number
    slug: string
    featuredimage: string
    audio: string
    date: any
    description: string
    episodeNumber: number
    seasonNumber: number
    totalPlays: number
    body: any
}

type Data = {
    episodes: null | EpisodeDTO[]
}

export default Vue.extend({
    name: 'PodcastPage',
    components: { PodcastEpisode, PageTitle, FullLoader, ListenPodcastOn },
    data(): Data {
        return {
            episodes: null,
        }
    },
    methods: {
        async fetchEpisodes() {
            this.episodes = (await this.$content("podcasts").sortBy('date', 'desc').fetch()) as any as EpisodeDTO[];
        },
    },
    async created() {
        await this.fetchEpisodes()
    }

});
</script>
  