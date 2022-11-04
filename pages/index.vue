<template>
  <div class="p-2">
    <div v-for="testimony in testimonies">
      <p class="text-lg">{{ testimony.body }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';

export type Testimony = {
  // authorId: string
  body: string
}

type Data = {
  organization: null | string
  orgLocation: null | string
  testimonies: null | Testimony[]
}

export default Vue.extend({
  name: 'IndexPage',
  layout: 'landing',
  components: {},
  data(): Data {
    return {
      organization: null,
      orgLocation: null,
      testimonies: null
    }
  },
  methods: {
    async getTestimonies() {
      try {
        const { data: testimonies }: AxiosResponse<Testimony[]> = await axios.post('/api/get-testimonies', {
          organization: this.organization,
          orgLocation: this.orgLocation,
          accessToken: ''
        });;
        this.testimonies = testimonies;
      } catch (error) {
        console.error(error);
      }
    },
    async hey() {
      try {
        const { data }: AxiosResponse<any> = await axios.post('/api/hey', {
          organization: this.organization,
          orgLocation: this.orgLocation
        });
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    }
  },
  async created() {
    console.log(process)
    this.organization = process.env.organization || null;
    this.orgLocation = process.env.orgLocation || null;
    await this.hey();
  }
})
</script>
