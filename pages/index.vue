<template>
  <div v-if="!errorMessage && !isLoading" id="main-testimonies-container" class="p-2">
    <TestimonyThumb v-for="testimony in testimonies" :testimonyData="testimony" :key="testimony.id" />
    <div class="flex justify-center">
      <button v-if="testimonies" @click="getTestimonies(testimonies?.length, (testimonies?.length || 0) + 10)"
        class="bg-blue-500 hover:bg-blue-400 text-white transition-all ease-in-out py-1 px-2 rounded">
        Load More
      </button>
    </div>
  </div>
  <FullLoader v-else-if="isLoading && !errorMessage" />
  <div v-else-if="errorMessage" class="p-2">
    <p class="text-lg">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';
import TestimonyThumb from '~/components/testimonies/testimonyThumb.vue'

import FullLoader from '../components/layout/fullLoader.vue'
import { TestimonyDTO, TestimonyResponse } from '~/types/testimony';

type Data = {
  orgSlug: null | string
  orgLocation: null | string
  testimonies: null | TestimonyDTO[]
  errorMessage: null | string
  isLoading: boolean
  loadingMore: boolean
}

export default Vue.extend({
  name: 'IndexPage',
  layout: 'landing',
  components: { FullLoader, TestimonyThumb },
  data(): Data {
    return {
      orgSlug: null,
      orgLocation: null,
      testimonies: null,
      errorMessage: null,
      isLoading: true,
      loadingMore: false
    }
  },
  methods: {
    async getTestimonies(from = 0, to = 9) {
      this.loadingMore = true
      try {
        const { data: testimonies }: AxiosResponse<TestimonyResponse[]> = await axios.post('/api/get-testimonies', {
          orgSlug: this.orgSlug,
          orgLocation: this.orgLocation,
          from,
          to
        });
        let end = testimonies.length
        this.testimonies = [...this.testimonies || [], ...testimonies.slice(0, end).map(testimony => ({
          id: testimony.id,
          authorId: testimony.author_id,
          body: testimony.body,
          authorUsername: testimony.author_username,
          authorAvatarUrl: testimony.author_avatar_url,
          orgSlug: testimony.org_slug,
          orgLocation: testimony.org_Location,
        }))];
      } catch (error) {
        console.error(error);
        this.errorMessage = `Oops! there was an error :(`;
      }
      this.isLoading = false;
      this.loadingMore = false
    }
  },
  async created() {
    this.orgSlug = process.env.orgSlug || null;
    this.orgLocation = process.env.orgLocation || null;
    await this.getTestimonies();

    const { query } = this.$route
    if (query.toast_message) {
      this.$nuxt.$emit('toast', {
        message: query.toast_message,
        textColor: query.text_color || `text-teal-500`
      });
    }
  }
})
</script>

<style lang="scss" scoped>
#main-testimonies-container {
  padding-bottom: 100px;
}
</style>
