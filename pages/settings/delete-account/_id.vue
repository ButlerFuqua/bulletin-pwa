<template>
    <div>
        <div v-if="currentUser && !isSubmittingForm">
            <h1>{{ currentUser.username }}</h1>
            <button @click="cancelDelete"
                class="text-orange-400 hover:text-orange-500 transition-all ease-in-out font-black text-lg">Cancel</button>

            <p>To delete your account, type <span class="text-red-500 font-bold">{{ deletePhrase }}</span> in the text
                field below.</p>

            <label for="delete_phrase">Delete Forever</label>
            <input class="mt-2 p-2 rounded bg-gray-100" type="text" name="delete_phrase" v-model="deletePhraseInput">

            <button @click="deleteAccount" :disabled="!deleteConfirm"
                :class="deleteConfirm ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-300'"
                class="rounded shadow text-white transition-all ease-in-out p-2 px-3">
                Delete my Account FOREVER
            </button>

        </div>
        <FullLoader v-else />
    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import Vue from 'vue';
import AuthMixin from '~/mixins/auth.vue'
import { ProfileResponse, UserDTO, UserResponse } from '~/types/user';
import { clearLocalUserData, getAccessToken } from '~/utils/auth.utils';
import FullLoader from '~/components/layout/fullLoader.vue'

type Data = {
    userId: null | string
    currentUser: null | UserDTO
    password1: null | string
    password2: null | string
    isSubmittingForm: boolean
    showPassword: boolean
    deletePhrase: string
    deletePhraseInput: string
}

export default Vue.extend({
    name: 'ProfilePlage',
    layout: 'default',
    mixins: [AuthMixin],
    components: { FullLoader },
    data(): Data {
        return {
            userId: null,
            currentUser: null,
            password1: null,
            password2: null,
            isSubmittingForm: false,
            showPassword: false,
            deletePhrase: 'delete my account',
            // deletePhraseInput: 'Don\'t do it!'
            deletePhraseInput: 'delete my account'
        }
    },
    computed: {
        deleteConfirm() {
            return this.deletePhraseInput === this.deletePhrase
        }
    },
    methods: {
        async deleteAccount() {
            if (confirm(`Last chance, are you absolutely sure??`)) {
                try {
                    const { data } = await axios.post(`/api/delete-account-by-userid`, {
                        accessToken: getAccessToken(),
                        userId: this.currentUser!.id
                    });

                } catch (error: any) {
                    this.isSubmittingForm = false;
                    return this.$nuxt.$emit(`toast`, {
                        message: error.response?.data?.error || `Error updating`,
                        textColor: `text-red-500`
                    });
                }
                this.$nuxt.$emit('clear_local_user');
                this.$router.push({
                    path: `/`,
                    query: {
                        toast_message: `Your account will be deleted in 1-2 weeks. Log in before 1 week to reactive.`,
                    }
                });
            }
        },
        async getCurrentUser() {
            // @ts-ignore
            const currentUser: UserResponse = await this.getUserDataIfLoggedIn();
            if ((currentUser as any).error || currentUser.id !== this.userId) {
                return this.$router.push(`/members/${this.userId}`);
            }
            this.currentUser = {
                ...currentUser.user_metadata,
                id: currentUser.id
            }
        },
        async cancelDelete() {
            this.$router.push(`/`);
        }
    },
    async created() {
        this.userId = this.$route.params.id || null;
        await this.getCurrentUser();
    }
})
</script>