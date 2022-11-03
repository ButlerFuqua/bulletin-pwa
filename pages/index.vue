<template>
  <div class="p-2">
    <div>
      Hey, here's a good testimony, yall!
    </div>
    <p v-for="num in 50">Content...</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';

type Data = {
  organization: null | string
  orgLocation: null | string
}

export default Vue.extend({
  name: 'IndexPage',
  layout: 'landing',
  components: {},
  data(): Data {
    return {
      organization: null,
      orgLocation: null
    }
  },
  methods: {
    async getTestimonies() {
      try {
        const response: AxiosResponse<any> = await axios.post('/api/get-testimonies', {
          organization: this.organization,
          orgLocation: this.orgLocation,
          accessToken: ''
        });;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  },
  async created() {
    this.organization = process.env.organization || null;
    this.orgLocation = process.env.orgLocation || null;
    await this.getTestimonies();
  }
})
</script>
