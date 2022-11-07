<template>
    <div class="h-full">
        <div v-if="profile">
            <h1>{{ profile.username }}</h1>
        </div>
        <FullLoader v-else />
    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import Vue from 'vue';
import AuthMixin from '~/mixins/auth.vue'
import { ProfileResponse, UserDTO, UserLoginResponse, UserResponse } from '~/types/user';
import { getAccessToken } from '~/utils/auth.utils';
import FullLoader from '~/components/layout/fullLoader.vue'

type Data = {
    userId: null | string
    currentUser: null | UserDTO
    profile: null | ProfileResponse
}

export default Vue.extend({
    name: 'ProfilePlage',
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
        }
    },
    async created() {
        this.userId = this.$route.params.id || null;
        await this.getProfileByUserId();
        await this.getCurrentUser();
    }
})
</script>