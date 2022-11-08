<template>
    <div>
        <div v-if="currentUser && !isSubmittingForm && testimony">
            <h1>Edit Testimony</h1>
            <button @click="cancelCreate"
                class="text-orange-400 hover:text-orange-500 transition-all ease-in-out">Cancel</button>
            <button @click="deleteTestimony"
                class="text-gray-400 hover:text-gray-500 transition-all ease-in-out text-sm">Delete</button>

            <form class="flex flex-col" @submit.prevent="submitForm">
                <div class="my-3 flex flex-col">
                    <label for="body">What happened?</label>
                    <textarea class="mt-2 p-2 rounded" type="text" name="body" v-model="body" />
                </div>
                <button
                    class="bg-blue-500 hover:bg-blue-400 rounded shadow text-white transition-all ease-in-out p-2 px-3">
                    Submit
                </button>
            </form>
        </div>
        <FullLoader v-else-if="isSubmittingForm" />
        <div v-else>
            <button @click="$router.push(`/`)"
                class="text-blue-500 hover:text-blue-400 text-white transition-all ease-in-out">
                Home
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import Vue from 'vue';
import AuthMixin from '~/mixins/auth.vue'
import { UserDTO, UserResponse } from '~/types/user';
import { getAccessToken } from '~/utils/auth.utils';
import FullLoader from '~/components/layout/fullLoader.vue'
import { TestimonyResponse } from '~/types/testimony';

type Data = {
    currentUser: null | UserDTO
    isSubmittingForm: boolean
    body: string
    testimony: null | TestimonyResponse
    testimonyId: null | string
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
            body: '',
            testimony: null,
            testimonyId: null
        }
    },
    methods: {
        async getTestimony() {
            try {
                const { data: testimony }: AxiosResponse<TestimonyResponse> = await axios.post('/api/get-testimony-by-id', {
                    testimonyId: this.testimonyId
                });
                this.testimony = testimony;
                this.body = testimony.body;
            } catch (error: any) {
                console.error(error);
                this.$nuxt.$emit('toast', {
                    message: error.message || `there was an error :(`,
                    textColor: `text-red-500`
                })
            }
        },
        async submitForm() {
            this.isSubmittingForm = true;
            if (!await this.updateTestimony()) {
                return this.$router.push(`/`);
            }
            this.isSubmittingForm = false;
        },
        async updateTestimony() {
            try {
                await axios.post(`/api/update-testimony-by-id`, {
                    accessToken: getAccessToken(),
                    testimonyId: this.testimonyId,
                    body: this.body.trim(),
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
        },
        async deleteTestimony() {
            if (confirm(`Are you sure you want to delete this? This cannot be undone.`)) {
                try {
                    await axios.post(`/api/delete-testimony-by-id`, {
                        accessToken: getAccessToken(),
                        testimonyId: this.testimonyId
                    });
                    this.$router.push(`/`);
                } catch (error: any) {
                    return error
                }
            }
        },
    },
    async created() {
        await this.getCurrentUser();
        this.testimonyId = this.$route.params.id
        await this.getTestimony();
    }
})
</script>

<style lang="scss" scoped>

</style>