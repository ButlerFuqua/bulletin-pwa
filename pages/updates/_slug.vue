<template>
  <div v-if="update">
    <PageTitle :title="update.title" :breadCrumbDTOs="breadCrumbs" />
    <div class="p-2 text-gray-600 flex justify-between">
      <p>Created: {{returnFriendlyDate(update.createdAt)}}</p>
    </div>
    <div class="tldr bg-gray-200 rounded p-4 my-5">
      <p class="text-lg font-black">TL;DR</p>
      <p>{{update.description}}</p>
    </div>
    <div v-if="update">
      <nuxt-content class="p-2" :document="update" />
    </div>
    <FullLoader v-else />
  </div>
  <FullLoader v-else />
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder';
import Vue from 'vue'
import PageTitle, { BreadCrumb } from '../../components/layout/pageTitle.vue'

import { returnFriendlyDate } from '../../utils/string.utils';
import FullLoader from '../../components/layout/fullLoader.vue';

type Data = {
  update: FetchReturn | null,
  breadCrumbs: null | BreadCrumb[]
}

export default Vue.extend({
  name: 'UpdatePage',
  components: { PageTitle, FullLoader },
  data(): Data {
    return {
      update: null,
      breadCrumbs: null
    }
  },
  methods: {
    async fetchUpdate() {
      const slug = this.$nuxt.$route.params.slug;
      this.update = (await this.$content(`updates/${slug}`).fetch()) as FetchReturn;
      this.breadCrumbs = [
        {
          label: 'Updates',
          path: '/updates',
          current: false
        },
        {
          label: this.update.title,
          path: `/updates/${this.update.slug}`,
          current: true
        },
      ]
    },
    returnFriendlyDate(dateString: string) {
      return returnFriendlyDate(dateString);
    },
  },
  async created() {
    await this.fetchUpdate()
  }
})
</script>
