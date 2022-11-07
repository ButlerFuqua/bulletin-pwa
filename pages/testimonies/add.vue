<template>
    <div class="h-full">
        <div v-if="currentUser && !isSubmittingForm">
            <h1>Add Testimony</h1>
            <button @click="cancelCreate"
                class="text-orange-400 hover:text-orange-500 transition-all ease-in-out">Cancel</button>

            <form class="flex flex-col" @submit.prevent="submitForm">
                <div class="my-3 flex flex-col">
                    <label for="body">What happened?</label>
                    <input class="mt-2 p-2 rounded" type="text" name="body" v-model="body">
                </div>
                <button
                    class="bg-blue-500 hover:bg-blue-400 rounded shadow text-white transition-all ease-in-out p-2 px-3">
                    Submit
                </button>
            </form>
        </div>
        <FullLoader v-else />
    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import Vue from 'vue';
import AuthMixin from '~/mixins/auth.vue'
import { UserDTO, UserResponse } from '~/types/user';
import { getAccessToken } from '~/utils/auth.utils';
import FullLoader from '~/components/layout/fullLoader.vue'

type Data = {
    currentUser: null | UserDTO
    isSubmittingForm: boolean
    body: string
}

export default Vue.extend({
    name: 'ProfilePlage',
    layout: 'form',
    mixins: [AuthMixin],
    components: { FullLoader },
    data(): Data {
        return {
            currentUser: null,
            isSubmittingForm: false,
            body: ''
        }
    },
    methods: {
        async submitForm() {
            this.isSubmittingForm = true;
            if (!await this.createTestimony()) {
                return this.$router.push(`/`);
            }
            this.isSubmittingForm = false;
        },
        async createTestimony() {
            try {
                await axios.post(`/api/create-testimony`, {
                    accessToken: getAccessToken(),
                    body: this.body,
                    user: this.currentUser
                });
            } catch (error: any) {
                return error
            }
        },
        async getCurrentUser() {
            // @ts-ignore
            const currentUser: UserResponse = await this.getUserDataIfLoggedIn();
            if ((currentUser as any).error) {
                return this.$router.push(`/`);
            }
            this.currentUser = {
                ...currentUser.user_metadata,
                id: currentUser.id
            }
        },
        async cancelCreate() {
            if (confirm(`Are you sure you want to leave? Unsaved changes will be discarded.`)) {
                this.$router.push(`/`);
            }
        }
    },
    async created() {
        await this.getCurrentUser();
    }
})
</script>