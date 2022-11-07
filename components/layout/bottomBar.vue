<template>
    <div v-if="user" class="sticky bottom-0 bg-white p-2 flex align-center justify-center">
        Add Testimony
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import AuthMixin from '~/mixins/auth.vue'
import { UserDTO, UserResponse } from '~/types/user';

type Data = {
    user: null | UserDTO
}

export default Vue.extend({
    name: 'BottomBar',
    mixins: [AuthMixin],
    data(): Data {
        return {
            user: null
        }
    },
    async created() {
        //@ts-ignore
        const userData = await this.getUserDataIfLoggedIn();
        console.log('userData', userData)
        if (userData.error) {
            this.user = null;
            return;
        }
        this.user = {
            ...(userData as UserResponse).user_metadata,
            id: userData.id
        }
    }
})
</script>