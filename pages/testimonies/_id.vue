<template>
    <div>
        <div v-if="testimony">
            <div id="user_info">
                <img :src="testimony.author_avatar_url" alt="Avatar for author of testimony">
                <p>{{ testimony.author_username }}</p>
            </div>
            <button v-if="isCurrentUser" @click="$router.push(`/testimonies/edit/${testimonyId}`)"
                class="text-orange-400 hover:text-orange-500 transition-all ease-in-out">Edit</button>
            <button @click="$router.push(`/`)" class="text-teal-500 hover:text-teal-400 transition-all ease-in-out">All
                Testimonies</button>
            <div class="testimony_body">
                {{ testimony.body }}
            </div>
        </div>
        <FullLoader v-else="isSubmittingForm" />
    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import Vue from 'vue';
import AuthMixin from '~/mixins/auth.vue'
import { UserDTO, UserResponse } from '~/types/user';
import { getAccessToken, getLocalUserData } from '~/utils/auth.utils';
import FullLoader from '~/components/layout/fullLoader.vue'
import { TestimonyResponse } from '~/types/testimony';

type Data = {
    currentUser: null | UserDTO
    testimony: null | TestimonyResponse
    testimonyId: null | string
    isCurrentUser: boolean
}

export default Vue.extend({
    name: 'ProfilePlage',
    layout: 'form',
    mixins: [AuthMixin],
    components: { FullLoader },
    data(): Data {
        return {
            currentUser: null,
            testimony: null,
            testimonyId: null,
            isCurrentUser: false
        }
    },
    methods: {
        async getTestimony() {
            try {
                const { data: testimony }: AxiosResponse<TestimonyResponse> = await axios.post('/api/get-testimony-by-id', {
                    testimonyId: this.testimonyId
                });
                this.testimony = testimony;
            } catch (error: any) {
                console.error(error);
                this.$nuxt.$emit('toast', {
                    message: error.message || `there was an error :(`,
                    textColor: `text-red-500`
                })
            }
        },
        async getCurrentUser() {
            // @ts-ignore
            const currentUser: UserResponse = await this.getUserDataIfLoggedIn();
            if ((currentUser as any).error) {
                return this.$router.push(`/`);
            }
            this.currentUser = {
                ...currentUser.user_metadata,
                id: currentUser.id
            }
        },
    },
    async created() {
        this.testimonyId = this.$route.params.id
        await this.getTestimony();
        this.currentUser = getLocalUserData();
        if (this.currentUser) {
            this.isCurrentUser = this.currentUser.id === this.testimony?.author_id
        }
    }
})
</script>

<style lang="scss" scoped>
#user_info {
    & img {
        width: 150px;
        height: 150px;
        object-fit: cover;
    }
}

.testimony_body {
    white-space: pre-line;
}
</style>