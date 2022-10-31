<template>
    <div v-if="article" class="border p-2 my-3">
        <p @click="() => navToArticle(article)"
            class="text-xl bold text-green-500 hover:text-green-400 transition-all font-black cursor-pointer mb-2">
            {{article.title}}</p>
        <img v-if="article.featuredimage" :src="article.featuredimage" class="rounded" />
        <p class="text-gray-500 italic text-sm my-1">{{new Date(article.createdAt).toLocaleDateString()}}</p>
        <p>{{article.description}}</p>
        <NuxtLink :to="article.path">
            <button class="text-purple-500 font-bold hover:text-purple-400 transition-all">Read more</button>
        </NuxtLink>
    </div>
</template>

<script lang="ts">
import { FetchReturn } from '@nuxt/content/types/query-builder';
import Vue from 'vue';


type Data = {
    article: null | FetchReturn
}

export default Vue.extend({
    name: 'ArticleThumbnail',
    props: ['articleData'],
    data(): Data {
        return {
            article: null
        }
    },
    methods: {
        navToArticle(article: any) {
            this.$router.push(article.path)
        }
    },
    created() {
        this.article = this.articleData as FetchReturn;
    }
})
</script>