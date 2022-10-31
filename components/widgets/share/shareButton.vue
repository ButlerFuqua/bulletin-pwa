<template>
    <div class="fixed w-full z-20 bottom-0 right-0 flex items-center justify-center p-3">
        <button @click="handleShareClicked()"
            class="py-1 px-2 rounded bg-blue-500 hover:bg-blue-400 text-white transition-all ease">
            {{!isLoading ? 'Share' : '...'}}
        </button>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';

type Data = {
    isLoading: boolean
}

export default Vue.extend({
    name: 'ShareButton',
    data(): Data {
        return {
            isLoading: false,
        }
    },
    methods: {
        handleShareClicked() {
            this.isLoading = true;

            // @ts-ignore
            if (navigator && navigator.share) this.shareUsingNavigator();
            else if (navigator && navigator.clipboard) this.shareUsingCopy();
            else this.setCannotCopyMessage();

            this.isLoading = false;
        },
        shareUsingNavigator() {
            navigator.share({ url: window.location.href });
        },
        shareUsingCopy() {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        },
        setCannotCopyMessage() {
            alert(`Cannot share, sorry`);
        },
    }
})
</script>