<template>
    <div v-if="testimony" class="bg-white rounded p-3 my-3">
        <div class="testimony_author_info flex items-center my-3">
            <img :src="testimony.authorAvatarUrl" alt="avatar of testimony's author">
            <p class="ml-3">{{ testimony.authorUsername }}</p>
        </div>
        <div class="testimony_body">
            {{ testimony.body }}
        </div>
        <div>
            <button v-if="isCurrentUser" class="text-orange-400 hover:text-orange-300 transition-all ease">Edit</button>
        </div>
    </div>
    <FullLoader v-else />
</template>

<script lang="ts">
import Vue from 'vue';
import FullLoader from '~/components/layout/fullLoader.vue'
import { TestimonyDTO } from '~/types/testimony';
import { UserDTO } from '~/types/user';
import { getLocalUserData } from '~/utils/auth.utils';

type Data = {
    testimony: null | TestimonyDTO
    currentUser: null | UserDTO
    isCurrentUser: boolean
}

export default Vue.extend({
    name: 'TestimonyThumb',
    props: ['testimonyData'],
    components: { FullLoader },
    data(): Data {
        return {
            testimony: null,
            currentUser: null,
            isCurrentUser: false,
        }
    },
    created() {
        this.testimony = this.testimonyData;
        this.currentUser = getLocalUserData();
        if (this.currentUser) {
            this.isCurrentUser = this.currentUser.id === this.testimony?.authorId
        }
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


.testimony_body {
    white-space: pre-line;
}
</style>