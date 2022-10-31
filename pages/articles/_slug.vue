<template>
  <div v-if="article">
    <PageTitle :title="article.title" :breadCrumbDTOs="breadCrumbs" />
    <div class="p-2 text-gray-600 flex justify-between">
      <p>Created: {{returnFriendlyDate(article.createdAt)}}</p>
      <p>Last updated: {{returnFriendlyDate(article.updatedAt)}}</p>
    </div>
    <div class="p-2">
      <img v-if="article.featuredimage" :src="article.featuredimage" class="rounded" />
    </div>
    <div class="tldr bg-gray-200 rounded p-4 my-5">
      <p class="text-lg font-black">TL;DR</p>
      <p>{{article.description}}</p>
    </div>
    <nuxt-content class="p-2" :document="article" />
    <!-- <ShareButton /> -->
  </div>
  <FullLoader v-else />
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder';
import Vue from 'vue'
import PageTitle, { BreadCrumb } from '../../components/layout/pageTitle.vue';
import ShareButton from '../../components/widgets/share/shareButton.vue'

import { returnFriendlyDate } from '../../utils/string.utils';
import FullLoader from '~/components/layout/fullLoader.vue';

type Data = {
  article: FetchReturn | null,
  articlesDisplayName: string | null,
  breadCrumbs: null | BreadCrumb[]
}

export default Vue.extend({
  name: 'ArticlePage',
  components: { PageTitle, FullLoader, ShareButton },
  data(): Data {
    return {
      article: null,
      articlesDisplayName: null,
      breadCrumbs: null
    }
  },
  methods: {
    async fetchArticle() {
      const slug = this.$nuxt.$route.params.slug;
      this.article = (await this.$content(`articles/${slug}`).fetch()) as FetchReturn;
      this.breadCrumbs = [
        {
          label: 'Articles',
          path: '/articles',
          current: false
        },
        {
          label: this.article.title,
          path: `/articles/${this.article.slug}`,
          current: true
        },
      ]
    },
    returnFriendlyDate(dateString: string) {
      return returnFriendlyDate(dateString);
    },
  },
  async beforeMount() {
    this.articlesDisplayName = process.env.articlesDisplayName || 'Articles';
  },
  async created() {
    this.$nuxt.$router.push('/');
    // await this.fetchArticle()
  }
})
</script>
