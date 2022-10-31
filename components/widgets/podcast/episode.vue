<template>
    <div v-if="episode" :class="!hideMeta ? 'border-b-2 rounded p-2' : ''" class="my-3">
        <p v-if="!hideMeta" class="text-xl mb-3">{{ episode.title }}</p>
        <audio controls class="w-full">
            <source :src="episode.audio" type="audio/mpeg">
            Your browser does not support the audio tag.
        </audio>
        <div v-if="!hideMeta" class="p-1">
            <span class="m-2 text-orange-500">
                Ep {{ episode.seasonNumber }}:{{ episode.episodeNumber }}
            </span>
            <span class="m-2 text-orange-500">
                plays {{ totalPlays || episode.totalPlays }}
            </span>
        </div>
        <div v-if="!hideMeta && episode" class="flex justify-end mt-2">
            <button @click="$router.push(`/podcast/${episode?.slug}`)"
                class="text-green-500 hover:text-green-400 font-bold transition-all eas-in-out p-2 rounded">
                View Episode
            </button>
        </div>
    </div>
    <FullLoader v-else />
</template>
  
<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import Vue from 'vue';

import FullLoader from '~/components/layout/fullLoader.vue';
import { EpisodeDTO } from '~/pages/podcast/index.vue';
import { EpisodeAxiosDTO } from '~/pages/podcast/_slug.vue';

type Data = {
    episode: null | EpisodeDTO
    totalPlays: null | number
}

export default Vue.extend({
    name: 'PodcastEpisode',
    props: ['episodeData', 'hideMeta'],
    components: { FullLoader },
    data(): Data {
        return {
            episode: null,
            totalPlays: null
        }
    },
    methods: {
        async getUpdatedTotalPlays() {
            const { episode: podcastEpisode } = this;
            if (podcastEpisode) {
                try {
                    const { data: episode }: AxiosResponse<EpisodeAxiosDTO> = await axios.post('/api/one-episode', { episodeId: podcastEpisode.id });
                    this.totalPlays = episode.total_plays;
                } catch (error) {
                    console.error(error)
                }
            }
        },
    },
    async created() {
        this.episode = this.episodeData;
        await this.getUpdatedTotalPlays();
    }
})
</script>

  