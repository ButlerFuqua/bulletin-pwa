<template>
    <div class="bg-blue-500 flex sticky top-0">
        <div class="w-full p-1 text-center">
            <h1 class="text-lg text-white">Testimony Blog</h1>
        </div>
        <button @click="showNav = true" class="bg-blue-600 hover:bg-blue-400 text-white transition-all ease-in-out p-1">
            Menu
        </button>
        <div id="mainNav" :class="showNav ? '' : 'hide-nav'" class="fixed bg-purple-800 w-full h-full top-0">
            <div class="flex justify-end">
                <button @click="showNav = false"
                    class="bg-blue-600 hover:bg-blue-400 text-white transition-all ease-in-out p-1">
                    Close
                </button>
            </div>
            <div id="userInfo" class="text-white">
                <div v-if="user" class="flex flex-col items-center justify-center">
                    <p class="my-2">Logged in as <span class="text-yellow-400">{{ user.username }}</span></p>
                    <button @click="goToPage(`/members/${user?.id}`)"
                        class="bg-blue-500 hover:bg-blue-400 transition-all eas-in-out text-white py-1 px-2 rounded shadow">
                        Profile
                    </button>
                    <button @click="logout"
                        class="bg-gray-500 hover:bg-gray-400 transition-all eas-in-out text-white py-1 px-2 rounded shadow">
                        Logout
                    </button>
                </div>
                <div v-else class="flex flex-col">
                    <button @click="goToPage(`/entry/login`)"
                        class="bg-blue-500 hover:bg-blue-400 transition-all eas-in-out text-white py-1 px-2 rounded shadow">
                        Login
                    </button>
                    <button @click="goToPage(`/entry/signup`)"
                        class="bg-yellow-300 hover:bg-yellow-200 transition-all eas-in-out text-black py-1 px-2 rounded shadow">
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserDTO, UserResponse } from '~/types/user';
import AuthMixin from '~/mixins/auth.vue'
import { clearLocalUserData } from '~/utils/auth.utils';


type Data = {
    showNav: boolean
    user: null | UserDTO
}

export default Vue.extend({
    name: 'MainNav',
    props: ['userData'],
    mixins: [AuthMixin],
    data(): Data {
        return {
            showNav: false,
            user: null
        }
    },
    methods: {
        goToPage(path: string, options?: any) {
            this.$router.push({
                path
            });
            this.showNav = false;
        },
        logout() {

            if (!confirm(`Are you sure you want to logout?`))
                return;

            clearLocalUserData();
            this.$router.push(`/`);
            this.showNav = false;
            this.user = null;
        }
    },
    async created() {
        // @ts-ignore
        const userData = await this.getUserDataIfLoggedIn();
        console.log('userData', userData)
        if (!userData.error) {
            this.user = {
                ...(userData as UserResponse).user_metadata,
                id: userData.id
            };
        }
    }
})
</script>

<style lang="scss">
#mainNav {

    transition: all .3s;
    left: 0;
    opacity: 1;

    &.hide-nav {
        left: 100vw;
        opacity: 0;
    }
}
</style>