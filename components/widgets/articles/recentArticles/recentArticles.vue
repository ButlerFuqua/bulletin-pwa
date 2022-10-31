<template>
    <div>
        <p class="text-xl">Latest Articles</p>
        <NuxtLink class="text-blue-500" to="/articles">View all articles</NuxtLink>
        <!-- Commented out because I removed the mixin and I don't want to refactor til this is being used -->
        <!-- <div v-if="latestArticles">
            <ArticleThumbnail v-for="article in latestArticles" :key="article.title" :articleData="article" />
        </div> -->
        <!-- <FullLoader v-else /> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ArticleThumbnail from '../../../../components/widgets/articles/articleThumbnail.vue'

import FullLoader from '~/components/layout/fullLoader.vue';

export default Vue.extend({
    name: "RecentArticles",
    components: { ArticleThumbnail, FullLoader }
});
</script>