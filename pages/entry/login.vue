<template>
    <div>
        <h1>Login</h1>
        <div v-if="!isSubmittingLogin">
            <form class="flex flex-col" @submit.prevent="submitLogin">
                <input class="my-2 p-2 rounded" type="email" name="email" v-model="email" required>
                <input class="my-2 p-2 rounded" :type="!showPassword ? 'password' : 'text'" name="password"
                    v-model="password" required>
                <button
                    class="bg-blue-500 hover:bg-blue-400 rounded shadow text-white transition-all ease-in-out p-2 px-3">
                    Login
                </button>
            </form>
            <button @click="showPassword = !showPassword" class="text-teal-400 my-5">
                {{ !showPassword ? 'Show Password' : 'Hide Password' }}
            </button>
            <div class="my-3 flex flex-col">
                <NuxtLink
                    class="bg-yellow-400 hover:bg-yellow-300 transition-all ease-in-out rounded p-2 px-3 text-center"
                    to="/entry/signup">
                    Sign up
                </NuxtLink>
            </div>
        </div>
        <FullLoader v-else-if="isSubmittingLogin" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';

import FullLoader from '../../components/layout/fullLoader.vue'
import { returnStoragePrefix } from '~/utils/string.utils';
import { UnauthResponse } from '~/types/auth';
import { accessTokenKey } from '~/utils/auth.utils';
import { UserResponse, UserLoginResponse } from '~/types/user';
import { userTokenKey } from '~/utils/user.utils';

type Data = {
    isSubmittingLogin: boolean
    email: null | string
    password: null | string
    showPassword: boolean
}


export default Vue.extend({
    name: 'LoginPage',
    layout: 'entry',
    components: { FullLoader },
    data(): Data {
        return {
            showPassword: false,
            isSubmittingLogin: false,
            email: 'butlerfuqua+user1@gmail.com',
            password: 'password1',
        }
    },
    methods: {
        async submitLogin() {
            this.isSubmittingLogin = true;
            const response = await this.login();
            if ((response as any)?.error) {
                this.isSubmittingLogin = false;
                return this.$nuxt.$emit(`toast`, {
                    message: response?.error.message || `Error logging in`,
                    textColor: `text-red-500`
                });
            }
            this.$router.push({
                path: `/`,
                query: {
                    toast_message: `You will be logged in for one week`,
                }
            });
        },
        async login() {
            try {
                const { data: userLoginResponse }: AxiosResponse<UserLoginResponse> = await axios.post(`/api/login`, {
                    email: this.email,
                    password: this.password
                });
                const { access_token, user } = userLoginResponse;
                this.storeUserData(access_token, user);
            } catch (error: any) {
                return {
                    error: {
                        message: error.response?.data?.error
                    }
                }
            }
        },
        storeUserData(accessToken: string, user: UserResponse) {
            const storagePrefix = returnStoragePrefix();
            localStorage.setItem(`${storagePrefix}${accessTokenKey}`, accessToken);
            localStorage.setItem(`${storagePrefix}${userTokenKey}`, JSON.stringify({
                id: user.id,
                email: user.email,
                ...user.user_metadata
            }));
        }
    },
    async created() {
    }
})
</script>