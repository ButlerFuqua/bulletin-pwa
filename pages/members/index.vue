<template>
    <div v-if="!errorMessage && !isLoading" id="main-users-container" class="p-2">
        <div v-if="users?.length">
            <div v-for="user in users" :userData="user" :key="user.id"
                class="flex user_thumb items-center my-2 justify-between">
                <div class="flex items-center">
                    <img :src="user.avatar_url" alt="">
                    <p class="text-lg ml-3"> {{ user.username }}</p>
                </div>
                <button @click="$router.push(`/members/${user.id}`)"
                    class="text-teal-400 hover:text-teal-500 transition-all ease-in-out">Profile</button>
            </div>
        </div>
        <div v-else class="p-2 bg-teal-600 text-white rounded text-center">
            <p class="my-2">Be the first to write a user!</p>
            <p>Click <span class="font-black">"Add User"</span> below</p>
        </div>
        <div class="flex justify-center">
            <button v-if="users && users?.length" @click="getUsers(users?.length, (users?.length || 0) + 9)"
                class="bg-blue-500 hover:bg-blue-400 text-white transition-all ease-in-out py-1 px-2 rounded">
                Load More
            </button>
        </div>
    </div>
    <FullLoader v-else-if="isLoading && !errorMessage" />
    <div v-else-if="errorMessage" class="p-2">
        <p class="text-lg">{{ errorMessage }}</p>
    </div>
</template>
  
<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';
import AuthMixin from '~/mixins/auth.vue'

import FullLoader from '~/components/layout/fullLoader.vue'
import { ProfileResponse, UserDTO } from '~/types/user';

type Data = {
    orgSlug: null | string
    orgLocation: null | string
    users: null | ProfileResponse[]
    currentUser: null | UserDTO
    errorMessage: null | string
    isLoading: boolean
    loadingMore: boolean
}

export default Vue.extend({
    name: 'MembersListPage',
    layout: 'landing',
    mixins: [AuthMixin],
    components: { FullLoader },
    data(): Data {
        return {
            orgSlug: null,
            orgLocation: null,
            users: null,
            currentUser: null,
            errorMessage: null,
            isLoading: true,
            loadingMore: false
        }
    },
    methods: {
        async getUsers(from = 0, to = 9) {
            this.loadingMore = true
            try {
                const { data: users }: AxiosResponse<ProfileResponse[]> = await axios.post('/api/get-profiles', {
                    orgSlug: this.orgSlug,
                    orgLocation: this.orgLocation,
                    from,
                    to
                });
                let end = users.length
                this.users = [
                    ...this.users || [],
                    ...users.slice(0, end)];
            } catch (error) {
                console.error(error);
                this.errorMessage = `Oops! there was an error :(`;
            }
            this.isLoading = false;
            this.loadingMore = false
        },
        async getCurrentUser() {
            // @ts-ignore
            const currentUser: UserResponse = await this.getUserDataIfLoggedIn();
            if ((currentUser as any).error) {
                return this.$router.push({
                    path: `/`,
                    query: {
                        toast_message: `Must be logged in to view members.`,
                        text_color: `text-red-500`
                    }
                });
            }
            this.currentUser = {
                ...currentUser.user_metadata,
                id: currentUser.id
            }
        },
    },
    async created() {
        this.orgSlug = process.env.orgSlug || null;
        this.orgLocation = process.env.orgLocation || null;
        await this.getCurrentUser();
        await this.getUsers();

        const { query } = this.$route
        if (query.toast_message) {
            this.$nuxt.$emit('toast', {
                message: query.toast_message,
                textColor: query.text_color || `text-teal-500`
            });
        }
    }
})
</script>
  
<style lang="scss" scoped>
#main-users-container {
    padding-bottom: 100px;
}

.user_thumb {
    & img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
}
</style>
  