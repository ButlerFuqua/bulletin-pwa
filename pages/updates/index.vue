<template>
  <div>
    <PageTitle title="Updates" />
    <div v-if="updates" class="p-2">
      <div v-for="update in updates" :key="update.slug" class="p-2 my-3 border-b-2">
        <p class="mb-2">{{update.title}}</p>
        <NuxtLink :to="`/updates/${update.slug}`">
          <p class="font-black text-purple-600">Read More</p>
        </NuxtLink>
      </div>
    </div>
    <FullLoader v-else />
  </div>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import Vue from 'vue'
import PageTitle from '../../components/layout/pageTitle.vue'
import FullLoader from '../../components/layout/fullLoader.vue'

type Data = {
  updates: null | FetchReturn[]
}

export default Vue.extend({
  name: 'UpdatesIndexPage',
  components: { PageTitle, FullLoader },
  data(): Data {
    return {
      updates: null,
    }
  },
  methods: {
    async fetchUpdates() {
      this.updates = (await this.$content("updates").fetch()) as FetchReturn[];
    },
  },
  async created() {
    await this.fetchUpdates()
  }
})
</script>

<style lang="scss" scoped>

</style>