<template>
    <div>
        <h1>Login</h1>
        <div v-if="errorMessage" class="bg-red-400 p-3 rounded">
            <p>{{ errorMessage }}</p>
        </div>
        <div v-if="!isSubmittingLogin">
            <form class="flex flex-col" @submit.prevent="submitLogin">
                <input class="my-2 p-2 rounded" type="email" name="email" v-model="email" required>
                <input class="my-2 p-2 rounded" type="password" name="password" v-model="password" required>
                <button
                    class="bg-blue-500 hover:bg-blue-400 rounded shadow text-white transition-all ease-in-out p-2 px-3">
                    Login
                </button>
            </form>
            <div class="my-3 flex flex-col">
                <NuxtLink
                    class="bg-yellow-400 hover:bg-yellow-300 transition-all ease-in-out rounded p-2 px-3 text-center"
                    to="/entry/signup">
                    Sign up
                </NuxtLink>
            </div>
        </div>
        <div class="h-full" v-else-if="isSubmittingLogin">
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
    isSubmittingLogin: boolean
    errorMessage: string | null
    email: null | string
    password: null | string
}


export default Vue.extend({
    name: 'LoginPage',
    layout: 'entry',
    components: { FullLoader },
    data(): Data {
        return {
            isSubmittingLogin: false,
            errorMessage: null,
            email: 'butlerfuqua+user1@gmail.com',
            password: 'password1',
        }
    },
    methods: {
        async checkIfUserIsLoggedIn() {
            // todo rethink and finish this
            const accessToken = localStorage.getItem(`${returnStoragePrefix()}-access-token`);
            if (!accessToken)
                return;
            try {
                const { data }: AxiosResponse<UserResponse | UnauthResponse> = await axios.post(`/api/user`, {
                    accessToken,
                });
                // delete accessToken and return if it's expired
                if ((data as any).status) {
                    const { status } = data as UnauthResponse;
                    if (status < 200 || status >= 300) {
                        localStorage.removeItem(`${returnStoragePrefix()}-access-token`);
                        return;
                    }
                }
                const { email, } = data as UserResponse
            } catch (error: any) {
                this.errorMessage = error.message;
                console.error(error);
            }
        },
        async submitLogin() {
            this.isSubmittingLogin = true;
            await this.login();
            if (this.errorMessage) {
                this.isSubmittingLogin = false
                return;
            }
            this.$router.push(`/`);
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
        // await this.checkIfUserIsLoggedIn();
    }
})
</script>