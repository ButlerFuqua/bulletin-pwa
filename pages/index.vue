<template>
  <div v-if="!errorMessage && !isLoading" class="p-2">
    <div v-for="testimony in testimonies">
      <p class="text-lg">{{ testimony.body }}</p>
    </div>
  </div>
  <div v-else-if="isLoading && !errorMessage" class="h-full">
    <FullLoader />
  </div>
  <div v-else-if="errorMessage" class="p-2">
    <p class="text-lg">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';

import FullLoader from '../components/layout/fullLoader.vue'

export type Testimony = {
  // authorId: string
  body: string
}

type Data = {
  orgSlug: null | string
  orgLocation: null | string
  testimonies: null | Testimony[]
  errorMessage: null | string
  isLoading: boolean
}

export default Vue.extend({
  name: 'IndexPage',
  layout: 'landing',
  components: { FullLoader },
  data(): Data {
    return {
      orgSlug: null,
      orgLocation: null,
      testimonies: null,
      errorMessage: null,
      isLoading: true
    }
  },
  methods: {
    async getTestimonies() {
      try {
        const { data: testimonies }: AxiosResponse<Testimony[]> = await axios.post('/api/get-testimonies', {
          orgSlug: this.orgSlug,
          orgLocation: this.orgLocation
        });
        this.testimonies = testimonies;
      } catch (error) {
        this.errorMessage = `Oops! there was an error :(`;
        console.error(error);
      }
      this.isLoading = false;
    }
  },
  async created() {
    this.orgSlug = process.env.orgSlug || null;
    this.orgLocation = process.env.orgLocation || null;
    await this.getTestimonies();
  }
})
</script>
