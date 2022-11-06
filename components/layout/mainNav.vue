<template>
    <div class="bg-blue-500 flex sticky top-0">
        <div class="w-full p-1 text-center">
            <h1 class="text-lg text-white">Testimony Blog</h1>
        </div>
        <button @click="showNav = true" class="bg-blue-600 hover:bg-blue-400 text-white transition-all ease-in-out p-1">
            Menu
        </button>
        <Transition>
            <div v-if="showNav" class="fixed bg-purple-500 w-full h-full top-0 left-0">
                <div class="flex justify-end">
                    <button @click="showNav = false"
                        class="bg-blue-600 hover:bg-blue-400 text-white transition-all ease-in-out p-1">
                        Close
                    </button>
                </div>
                <div id="userInfo" class="text-white">
                    <div v-if="user">
                        {{ user.username }}
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserMetaData, UserResponse } from '~/types/user';
import AuthMixin from '~/mixins/auth.vue'


type Data = {
    showNav: boolean
    user: null | UserMetaData
}

export default Vue.extend({
    name: 'MainNav',
    props: ['userData'],
    mixins: [AuthMixin],
    data(): Data {
        return {
            showNav: true,
            user: null
        }
    },
    async created() {
        // @ts-ignore
        const userData = await this.getUserDataIfLoggedIn();
        console.log('userData', userData)
        if (!userData.error) {
            this.user = (userData as UserResponse).user_metadata;
        }
    }
})
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>