<template>
    <div v-if="podcastEpisode" class="p-2">
        <PageTitle :title="podcastEpisode.title" :breadCrumbDTOs="breadCrumbs" />
        <div class="text-gray-600 flex sm:flex-col md:flex-row justify-between flex-wrap">
            <p class="mb-2">Published: {{ returnFriendlyDate(podcastEpisode.date) }}</p>
            <p class="mb-2">Season: {{ podcastEpisode.seasonNumber }}</p>
            <p class="mb-2">Episode: {{ podcastEpisode.episodeNumber }}</p>
            <p class="mb-2">Total Plays: {{ totalPlays || podcastEpisode.totalPlays }}</p>
        </div>
        <PodcastEpisode :episodeData="podcastEpisode" :hideMeta="true" />
        <div class="my-5 border-t-2 pt-3">
            <div id="showNotes">
                <nuxt-content class="p-2" :document="podcastEpisode" />
            </div>
        </div>

    </div>
    <div v-else-if="errorMessage">
        <p>
            {{ errorMessage }}
        </p>
    </div>
    <FullLoader v-else />
</template>
  
<script lang="ts">
import Vue from 'vue'
import PodcastEpisode from '../../components/widgets/podcast/episode.vue'
import PageTitle, { BreadCrumb } from '../../components/layout/pageTitle.vue'

import { returnFriendlyDate } from '../../utils/string.utils';
import FullLoader from '~/components/layout/fullLoader.vue';
import { EpisodeDTO } from './index.vue';
import axios, { AxiosResponse } from 'axios';

export type EpisodeAxiosDTO = {
    total_plays: number
}

type Data = {
    breadCrumbs: null | BreadCrumb[]
    podcastEpisode: null | EpisodeDTO
    errorMessage: null | string
    totalPlays: null | number
}

export default Vue.extend({
    name: 'PodcastEpisodePage',
    components: { PageTitle, PodcastEpisode, FullLoader },
    data(): Data {
        return {
            breadCrumbs: null,
            podcastEpisode: null,
            errorMessage: null,
            totalPlays: null
        }
    },
    methods: {
        async fetchEpisode() {
            const slug = this.$nuxt.$route.params.slug;
            this.podcastEpisode = (await this.$content(`podcasts/${slug}`).fetch()) as any as EpisodeDTO;
            this.breadCrumbs = [
                {
                    label: 'Podcast',
                    path: '/podcast',
                    current: false
                },
                {
                    label: this.podcastEpisode.title,
                    path: `/podcast/${this.podcastEpisode.slug}`,
                    current: true
                },
            ]
        },
        async getUpdatedTotalPlays() {
            const { podcastEpisode } = this;
            if (podcastEpisode) {
                try {
                    const { data: episode }: AxiosResponse<EpisodeAxiosDTO> = await axios.post('/api/one-episode', { episodeId: podcastEpisode.id });
                    this.totalPlays = episode.total_plays;
                } catch (error) {
                    console.error(error)
                    this.errorMessage = `Error getting podcast episode`
                }
            }
        },
        returnFriendlyDate(dateString: string) {
            return returnFriendlyDate(dateString);
        },

    },
    async beforeMount() {

    },
    async created() {
        await this.fetchEpisode();
        await this.getUpdatedTotalPlays();
    }
})
</script>
  