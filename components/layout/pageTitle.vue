<template>
    <div class="border-b-2 mb-3 p-2">
        <h1>{{title}}</h1>
        <div class="flex" v-if="breadCrumbs">
            <span class="transition-all ease-in-out"
                :class="!current ? 'text-blue-400 hover:text-blue-500 cursor-pointer' : ''"
                v-for="{label, path, current} in breadCrumbs" :key="label" @click="$router.push(path)">
                {{getBreadCrumbLabel(label)}}{{!current ? '&nbsp;/&nbsp;' : ''}}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
    breadCrumbs: BreadCrumb[] | null
}

export type BreadCrumb = {
    label: string
    path: string
    current: boolean
}

export default Vue.extend({
    name: 'PageTitle',
    props: ['title', 'breadCrumbDTOs'],
    data(): Data {
        return {
            breadCrumbs: null,
        }
    },
    methods: {
        getBreadCrumbLabel(label: string): string {
            if (label.length <= 12) {
                return label
            }
            return `${label.substring(0, 9)}...`
        }
    },
    created() {
        this.breadCrumbs = this.breadCrumbDTOs as BreadCrumb[];
    }
})
</script>