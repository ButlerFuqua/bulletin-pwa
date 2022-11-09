<template>
    <div>
        <button @click="$router.push(`/settings/delete-account/${currentUser?.id}`)"
            class="transition-all eas-in-out text-teal-500">
            Delete Account <small>(<em>don't do it!</em>)</small>
        </button>
    </div>
</template>
currentUser
<script lang="ts">
import Vue from 'vue';
import { UserDTO } from '~/types/user';
import { clearLocalUserData } from '~/utils/auth.utils';
import AuthMixin from '~/mixins/auth.vue'

type Data = {
    currentUser: null | UserDTO
}


export default Vue.extend({
    name: 'SettingsPage',
    layout: 'default',
    mixins: [AuthMixin],
    data(): Data {
        return {
            currentUser: null
        }
    },
    methods: {
        async getCurrentUser() {
            // @ts-ignore
            const currentUser: UserResponse = await this.getUserDataIfLoggedIn();
            if ((currentUser as any).error) {
                clearLocalUserData();
                return this.$router.push(`/`);
            }
            this.currentUser = {
                ...currentUser.user_metadata,
                id: currentUser.id
            }
        },
    },
    async created() {
        await this.getCurrentUser();
    }
});
</script>