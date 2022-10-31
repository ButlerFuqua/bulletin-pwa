<template>
  <div>
    <PageTitle title="Articles" />
    <div v-if="articles" class="flex flex-wrap justify-center p-2">
      <div class="articleThumbnail" v-for="article in articles" :key="article.slug">
        <ArticleThumbnail :articleData="article" />
      </div>
    </div>
    <FullLoader v-else />
  </div>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder'
import Vue from 'vue'
import PageTitle from '../../components/layout/pageTitle.vue'
import ArticleThumbnail from '../../components/widgets/articles/articleThumbnail.vue'
import FullLoader from '~/components/layout/fullLoader.vue'

type Data = {
  articles: null | FetchReturn[]
}

export default Vue.extend({
  name: 'ArticlesIndexPage',
  components: { PageTitle, ArticleThumbnail, FullLoader },
  data(): Data {
    return {
      articles: null,
    }
  },
  methods: {
    async fetchPosts() {
      this.articles = (await this.$content("articles").fetch()) as FetchReturn[];
    },
  },
  async created() {
    this.$nuxt.$router.push('/404');
    // await this.fetchPosts()
  }
})
</script>

<style lang="scss" scoped>
.articleThumbnail {
  width: 45%;
  margin: 0.5rem;
  max-width: 100%;

  @media (max-width: 800px) {
    width: 100%
  }
}
</style>