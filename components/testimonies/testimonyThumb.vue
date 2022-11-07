<template>
    <div v-if="testimony" class="bg-white rounded p-2 my-3">
        <div class="testimony_author_info flex items-center my-3">
            <img :src="testimony.authorAvatarUrl" alt="avatar of testimony's author">
            <p class="ml-3">{{ testimony.authorUsername }}</p>
        </div>
        <div class="testimony_thumb_body my-3">
            <div>
                {{ testimony.body }}
            </div>
        </div>
    </div>
    <FullLoader v-else />
</template>

<script lang="ts">
import Vue from 'vue';
import FullLoader from '~/components/layout/fullLoader.vue'

type Data = {
    testimony: any
}

export default Vue.extend({
    name: 'TestimonyThumb',
    props: ['testimonyData'],
    components: { FullLoader },
    data(): Data {
        return {
            testimony: null
        }
    },
    created() {
        this.testimony = this.testimonyData;
    }
})
</script>

<style lang="scss" scoped>
.testimony_author_info {
    & img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
}

.testimony_thumb_body {
    & div {
        padding-left: 50px;
    }
}
</style>