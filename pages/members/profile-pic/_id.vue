<template>
    <div>
        <div v-if="profile && currentUser && !isSubmittingForm">
            <h1>{{ profile.username }}</h1>
            <div v-if="profile.id === currentUser?.id">
                <button @click="cancelEdit"
                    class="text-orange-400 hover:text-orange-500 transition-all ease-in-out">Cancel</button>
                <button @click="$router.push(`/members/password/${currentUser?.id}`)"
                    class="text-teal-400 hover:text-teal-500 transition-all ease-in-out">Change Password</button>
            </div>
            <h2>Current Profile Pic</h2>
            <img :src="currentUser.avatar_url" alt="Current profile pic">
            <form class="flex flex-col" @submit.prevent="submitForm">
                <div class="my-3 flex flex-col">
                    <label for="avatar">Upload New Image</label>
                    <input @change="setAvatarFile" class="mt-2" type="file" name="avatar">
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
    avatarFile: null | File
    isSubmittingForm: boolean
}

export default Vue.extend({
    name: 'EditProfilePicPage',
    layout: 'form',
    mixins: [AuthMixin],
    components: { FullLoader },
    data(): Data {
        return {
            userId: null,
            currentUser: null,
            profile: null,
            avatarFile: null,
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
        setAvatarFile(event: any) {
            console.log(event.target.files[0])
        },
        async submitForm() {

            console.log(this.avatarFile)

            // this.isSubmittingForm = true;
            // await this.updateProfileData();
            // this.$router.push(`/members/${this.userId}`);
        },
        async updateProfileData() {
            try {
                const { data } = await axios.post(`/api/update-profile-by-userid`, {
                    userId: this.userId,
                    accessToken: getAccessToken(),
                    username: this.username
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