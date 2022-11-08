<template>
    <div id="profile-page">
        <div v-if="profile" class="h-full">
            <h1>{{ profile.username }}</h1>
            <div v-if="profile.id === currentUser?.id">
                <button @click="$router.push(`/members/edit/${userId}`)"
                    class="text-orange-400 hover:text-orange-500 transition-all ease-in-out">Edit</button>
                <button @click="$router.push(`/members/password/${currentUser?.id}`)"
                    class="text-teal-400 hover:text-teal-500 transition-all ease-in-out">Change Password</button>
            </div>
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
}

export default Vue.extend({
    name: 'ProfilePlage',
    layout: 'default',
    mixins: [AuthMixin],
    components: { FullLoader },
    data(): Data {
        return {
            userId: null,
            currentUser: null,
            profile: null
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
        async getCurrentUser() {
            // @ts-ignore
            const currentUser: UserResponse = await this.getUserDataIfLoggedIn();
            if ((currentUser as any).error) {
                return
            }
            this.currentUser = {
                ...currentUser.user_metadata,
                id: currentUser.id
            }
        },
    },
    async created() {
        this.userId = this.$route.params.id || null;
        await this.getProfileByUserId();
        await this.getCurrentUser();
    }
})
</script>


<style lang="scss" scoped>
#profile-page {
    min-height: 90vh;
}
</style>