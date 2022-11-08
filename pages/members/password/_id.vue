<template>
    <div>
        <div v-if="profile && currentUser && !isSubmittingForm">
            <h1>{{ profile.username }}</h1>
            <button v-if="profile.id === currentUser?.id" @click="cancelEdit"
                class="text-orange-400 hover:text-orange-500 transition-all ease-in-out">Cancel</button>

            <form class="flex flex-col" @submit.prevent="submitForm">

                <div class="my-3 flex flex-col">
                    <label for="password1">New Password</label>
                    <input class="mt-2 p-2 rounded" type="text" name="password1" v-model="password1">
                </div>

                <div class="my-3 flex flex-col">
                    <label for="password2">Confirm New Password</label>
                    <input class="mt-2 p-2 rounded" type="text" name="password2" v-model="password2">
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
    password1: null | string
    password2: null | string
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
            password1: null,
            password2: null,
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
            await this.updatePasword();
            this.$router.push(`/members/${this.userId}`);
        },
        async updatePasword() {
            try {
                const { data } = await axios.post(`/api/change-password-by-userid`, {
                    userId: this.userId,
                    accessToken: getAccessToken(),
                    password: this.password1
                });
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