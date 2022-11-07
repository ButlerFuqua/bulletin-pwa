<template>
    <div id="bottomBar" v-if="user" :class="!showBottomBar ? 'hide' : ''"
        class="fixed w-full bottom-0 border-t bg-white flex align-center justify-center z-1">
        <button @click="$router.push(`/testimonies/add`)"
            class="h-full border-l hover:bg-gray-100 transition-all ease border-r py-2 px-2">
            Add Testimony
        </button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import AuthMixin from '~/mixins/auth.vue'
import { UserDTO, UserResponse } from '~/types/user';

type Data = {
    user: null | UserDTO
    showBottomBar: boolean
}

export default Vue.extend({
    name: 'BottomBar',
    mixins: [AuthMixin],
    data(): Data {
        return {
            user: null,
            showBottomBar: true,
        }
    },
    async created() {
        this.$nuxt.$on('hideBottomBar', () => {
            this.showBottomBar = false;
        });
        this.$nuxt.$on('showBottomBar', () => {
            this.showBottomBar = true;
        });

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

<style lang="scss" scoped>
#bottomBar {
    opacity: 1;
    transition: all .3s;

    &.hide {
        opacity: 0;
        bottom: -50px;
    }
}
</style>