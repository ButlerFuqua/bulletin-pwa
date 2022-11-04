<template>
    <div>
        <h1>Login</h1>
        <div v-if="errorMessage" class="bg-red-400 p-3 rounded">
            <p>{{ errorMessage }}</p>
        </div>
        <div v-if="!isSubmittingLogin">
            <form class="flex flex-col" @submit.prevent="submitLogin">
                <input class="my-2 p-2 rounded" type="text" name="username_or_email" v-model="email">
                <input class="my-2 p-2 rounded" type="password" name="password" v-model="password">
                <button
                    class="bg-blue-500 hover:bg-blue-400 rounded shadow text-white transition-all ease-in-out">Login</button>
            </form>
            <NuxtLink to="/entry/signup">
                Sign up
            </NuxtLink>
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

type Data = {
    isSubmittingLogin: boolean
    errorMessage: string | null
    email: null | string
    password: null | string
}

type UserMetaData = {
    username: string
    org_slug: string
    org_location: string
    avatar_url: string
}

type UserResponse = {
    id: string
    email: string
    user_metadata: UserMetaData
}

type UnauthResponse = {
    status: number
    message: string
}

type UserLoginResponse = {
    access_token: string
    user: UserResponse
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
            password: 'password1'
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
            this.isSubmittingLogin = false
        },
        async login() {
            try {
                const { data: userLoginResponse }: AxiosResponse<UserLoginResponse> = await axios.post(`/api/login`, {
                    email: this.email,
                    password: this.password
                });
                const { access_token, user: { id: user_id } } = userLoginResponse;
                this.storeLoginCreds(access_token, user_id);
                console.log(userLoginResponse)
            } catch (error: any) {
                this.errorMessage = error.message;
                console.error(error);
            }
        },
        storeLoginCreds(accessToken: string, userId: string) {
            const storagePrefix = returnStoragePrefix();
            localStorage.setItem(`${storagePrefix}-access-token`, accessToken);
            localStorage.setItem(`${storagePrefix}-userId`, userId);
        }
    },
    async created() {
        // await this.checkIfUserIsLoggedIn();
    }
})
</script>