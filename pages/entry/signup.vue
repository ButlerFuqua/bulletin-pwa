<template>
    <div>
        <h1>Signup</h1>
        <div v-if="errorMessage" class="bg-red-400 p-3 rounded">
            <p>{{ errorMessage }}</p>
        </div>
        <div v-if="!isSubmittingSignup">
            <form class="flex flex-col" @submit.prevent="submitSignup">
                <input class="my-2 p-2 rounded" type="email" name="email" v-model="email" required>
                <input class="my-2 p-2 rounded" type="text" name="username" v-model="email" required>
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
        <div class="h-full" v-else-if="isSubmittingSignup">
            <FullLoader />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';

import FullLoader from '../../components/layout/fullLoader.vue'
import { returnStoragePrefix } from '~/utils/string.utils';
import { UnauthResponse } from '~/types/auth';
import { UserResponse, UserLoginResponse } from '~/types/user';

type Data = {
    isSubmittingSignup: boolean
    errorMessage: string | null
    email: null | string
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
            email: 'butlerfuqua+user1@gmail.com',
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
                    password: this.password
                });
                const { access_token, user } = userLoginResponse;
                this.storeUserData(access_token, user);
            } catch (error: any) {
                this.errorMessage = error.message;
                console.error(error);
            }
        },
        storeUserData(accessToken: string, user: UserResponse) {
            const storagePrefix = returnStoragePrefix();
            localStorage.setItem(`${storagePrefix}-access-token`, accessToken);
            localStorage.setItem(`${storagePrefix}-user`, JSON.stringify({
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