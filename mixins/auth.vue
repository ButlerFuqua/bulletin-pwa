<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';

import { returnStoragePrefix } from '~/utils/string.utils';
import { UnauthResponse } from '~/types/auth';
import { UserResponse, UserLoginResponse } from '~/types/user';
import { accessTokenKey } from '~/utils/auth.utils';
import { userTokenKey } from '~/utils/user.utils';

type Data = {
    isSubmittingLogin: boolean
    errorMessage: string | null
}

export default Vue.extend({
    name: 'AuthMixin',
    layout: 'entry',
    data(): Data {
        return {
            isSubmittingLogin: false,
            errorMessage: null,
        }
    },
    methods: {
        async getUserDataIfLoggedIn(): Promise<UserResponse | { error: any }> {
            const accessToken = localStorage.getItem(`${returnStoragePrefix()}${accessTokenKey}`);
            if (!accessToken)
                return { error: { message: `User not logged in.` } };
            try {
                const { data }: AxiosResponse<UserResponse | UnauthResponse> = await axios.post(`/api/user`, {
                    accessToken,
                });
                // delete accessToken and return if it's expired
                if ((data as any).status) {
                    const { status } = data as UnauthResponse;
                    if (status < 200 || status >= 300) {
                        localStorage.removeItem(`${returnStoragePrefix()}${accessTokenKey}`);
                        return { error: { message: `Login has expired` } };
                    }
                }
                return data as UserResponse;
            } catch (error: any) {
                console.error(error);
                return { error: { message: `Error fetching user data` } }
            }
        },
        async login(email: string, password: string): Promise<{ accessToken: string, user: UserLoginResponse } | { error: any }> {
            try {
                const { data: userLoginResponse }: AxiosResponse<UserLoginResponse> = await axios.post(`/api/login`, {
                    email,
                    password
                });
                const { access_token } = userLoginResponse;
                return {
                    accessToken: access_token,
                    user: userLoginResponse
                }
            } catch (error: any) {
                return {
                    error: {
                        message: error.message || `Error logging in.`
                    }
                };
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
        },
    },
    async created() {
        // await this.checkIfUserIsLoggedIn();
    }
})
</script>