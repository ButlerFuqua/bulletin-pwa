<template>
    <div id="toaster" v-if="toasts.length" class="flex flex-col p-2">
        <div class="my-1 shadow-md" v-for="{ message, textColor } in toasts" :key="message"
            :class="`bg-gray-800 p-3 rounded flex justify-between`">
            <p :class="`${textColor} mr-2`">{{ message }}</p>
            <button @click="removeToast(message)" :class="`font-black text-white`">x</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export type ToastMessage = {
    message: string
    textColor: string
}

type Data = {
    toasts: ToastMessage[]
}

export default Vue.extend({
    name: 'ToastAlert',
    data(): Data {
        return {
            toasts: [
                // Examples
                // {
                //     message: `Sorry... there was an error :(`,
                //     textColor: `text-red-500`
                // },
                // {
                //     message: `Here is some good news, ya'll!!`,
                //     textColor: `text-green-500`
                // },
            ],
        }
    },
    methods: {
        removeToast(msg: string) {
            this.toasts = this.toasts.filter(toast => toast.message !== msg);
        }
    },
    created() {
        this.$nuxt.$on('toast', (toast: ToastMessage) => {
            console.log('TOAST', toast)
            this.toasts.push(toast);
        })
    },
    beforeDestroy() {
        this.$nuxt.$off("toast");
    },
})
</script>

<style lang="scss" scoped>
#toaster {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 9;
}
</style>