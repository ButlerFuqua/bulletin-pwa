<template>
    <div class="h-full">
        <div v-if="profile && currentUser && !isSubmittingForm">
            <h1>{{ profile.username }}</h1>
            <button v-if="profile.id === currentUser?.id" @click="cancelEdit"
                class="text-orange-400 hover:text-orange-500 transition-all ease-in-out">Cancel</button>

            <form class="flex flex-col" @submit.prevent="submitForm">

                <div class="my-3 flex flex-col">
                    <label for="username">Username</label>
                    <input class="mt-2 p-2 rounded" type="text" name="username" v-model="username">
                </div>

                <button
                    class="bg-blue-500 hover:bg-blue-400 rounded shadow text-white transition-all ease-in-out p-2 px-3">
                    Submit
                </button>
            </form>
        </div>
        <FullLoader v-else />
    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import Vue from 'vue';
import AuthMixin from '~/mixins/auth.vue'
import { ProfileResponse, UserDTO, UserResponse } from '~/types/user';
import { getAccessToken } from '~/utils/auth.utils';
import FullLoader from '~/components/layout/fullLoader.vue'

type Data = {
    userId: null | string
    currentUser: null | UserDTO
    profile: null | ProfileResponse
    username: null | string
    isSubmittingForm: boolean
}

export default Vue.extend({
    name: 'ProfilePlage',
    layout: 'form',
    mixins: [AuthMixin],
    components: { FullLoader },
    data(): Data {
        return {
            userId: null,
            currentUser: null,
            profile: null,
            username: null,
            isSubmittingForm: false
        }
    },
    methods: {
        async getProfileByUserId() {
            try {
                const { data: profileResponse }: AxiosResponse<ProfileResponse> = await axios.post(`/api/get-profile-by-userid`, {
                    userId: this.userId,
                    accessToken: getAccessToken()
                });
                this.profile = profileResponse;
            } catch (error: any) {
                console.error(error);
            }
        },
        async submitForm() {
            this.isSubmittingForm = true;
            await this.updateProfileData();
            this.$router.push(`/members/${this.userId}`);
        },
        async updateProfileData() {
            try {
                const { data } = await axios.post(`/api/update-profile-by-userid`, {
                    userId: this.userId,
                    accessToken: getAccessToken(),
                    username: this.username
                });
                console.log('UPDATE DATA', data)
                await this.getProfileByUserId();
                await this.getCurrentUser();
            } catch (error: any) {
                console.error(error);
            }
        },
        async getCurrentUser() {
            // @ts-ignore
            const currentUser: UserResponse = await this.getUserDataIfLoggedIn();
            if ((currentUser as any).error || currentUser.id !== this.profile?.id) {
                return this.$router.push(`/members/${this.userId}`);
            }
            this.currentUser = {
                ...currentUser.user_metadata,
                id: currentUser.id
            }
        },
        fillFormData() {
            if (this.profile) {
                this.username = this.profile.username;
            }
        },
        async cancelEdit() {
            if (confirm(`Are you sure you want to leave? Unsaved changes will be discarded.`)) {
                this.$router.push(`/members/${this.userId}`);
            }
        }
    },
    async created() {
        this.userId = this.$route.params.id || null;
        await this.getProfileByUserId();
        await this.getCurrentUser();
    }
})
</script>