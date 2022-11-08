<template>
    <div>
        <h1>Signup</h1>
        <!-- <div v-if="errorMessage" class="bg-red-400 p-3 rounded flex justify-between">
            <p>{{ errorMessage }}</p>
            <button @click="errorMessage = null" class="font-black">x</button>
        </div> -->
        <div v-if="!isSubmittingSignup">
            <form class="flex flex-col" @submit.prevent="submitSignup">
                <input class="my-2 p-2 rounded" type="email" name="email" v-model="email" required>
                <input class="my-2 p-2 rounded" type="text" name="username" v-model="username" required>
                <input class="my-2 p-2 rounded" type="password" name="password" v-model="password" required>
                <button
                    class="bg-blue-500 hover:bg-blue-400 rounded shadow text-white transition-all ease-in-out p-2 px-3">
                    Signup
                </button>
            </form>
            <div class="my-3 flex flex-col">
                <NuxtLink
                    class="bg-yellow-400 hover:bg-yellow-300 transition-all ease-in-out rounded p-2 px-3 text-center"
                    to="/entry/login">
                    Login
                </NuxtLink>
            </div>
        </div>
        <FullLoader v-else-if="isSubmittingSignup" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosError, AxiosResponse } from 'axios';

import FullLoader from '../../components/layout/fullLoader.vue'
import { returnStoragePrefix } from '~/utils/string.utils';
import { accessTokenKey } from '~/utils/auth.utils';
import { UserResponse, UserLoginResponse } from '~/types/user';
import { userTokenKey } from '~/utils/user.utils';

type Data = {
    isSubmittingSignup: boolean
    errorMessage: string | null
    username: string | null
    email: null | string
    orgSlug: null | string
    orgLocation: null | string
    password: null | string
}


export default Vue.extend({
    name: 'SignupPage',
    layout: 'entry',
    components: { FullLoader },
    data(): Data {
        return {
            isSubmittingSignup: false,
            errorMessage: null,
            orgSlug: null,
            orgLocation: null,
            email: 'butlerfuqua+user2@gmail.com',
            username: 'uniqueusername2',
            password: 'password1',
        }
    },
    methods: {
        async submitSignup() {
            this.isSubmittingSignup = true;
            await this.Signup();
            if (this.errorMessage) {
                this.isSubmittingSignup = false
                return;
            }
            this.$router.push(`/`);
        },
        async Signup() {
            try {
                const { data: userLoginResponse }: AxiosResponse<UserLoginResponse> = await axios.post(`/api/signup`, {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                    orgSlug: this.orgSlug,
                    orgLocation: this.orgLocation,
                });
                const { access_token, user } = userLoginResponse;
                this.storeUserData(access_token, user);
            } catch (error: any) {
                this.errorMessage = error.response?.data?.message || `Sorry... there was an error :(`;
                console.error(error.response?.data?.error || error);
                this.$nuxt.$emit('toast', {
                    message: error.response?.data?.message || `Sorry... there was an error :(`,
                    textColor: `text-red-500`
                });
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
        this.orgSlug = process.env.orgSlug || null;
        this.orgLocation = process.env.orgLocation || null;
    }
})
</script>