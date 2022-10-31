<template>
    <div class="p-2 overflow-scroll flex flex-nowrap items-center">
        <a :class="`${platform.color} ${platform.hoverColor} text-${platform.textColor} py-1 px-2 transition-all ease rounded shadow m-1`"
            v-for="platform in platforms" :key="platform.label" :href="platform.link" target="_blank">
            {{platform.label}}
        </a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'ListenPodcastOn',
    data() {
        return {
            platforms: [
                {
                    label: 'Spotify',
                    link: 'https://open.spotify.com/show/1JVuhEvDljWSbXNUu8Y306',
                    color: 'bg-green-500',
                    hoverColor: 'hover:bg-green-400',
                    textColor: 'black'
                },
                {
                    label: 'Apple',
                    link: 'https://podcasts.apple.com/us/podcast/dudes-funny/id1617486750',
                    color: 'bg-purple-500',
                    hoverColor: 'hover:bg-purple-400',
                    textColor: 'white'
                },
                {
                    label: 'Google',
                    link: 'https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5idXp6c3Byb3V0LmNvbS8xOTQyNjQxLnJzcw==',
                    color: 'bg-blue-500',
                    hoverColor: 'hover:bg-blue-400',
                    textColor: 'white'
                },
                {
                    label: 'iHeart',
                    link: 'https://www.iheart.com/podcast/269-dudes-funny-95016989/',
                    color: 'bg-red-500',
                    hoverColor: 'hover:bg-red-400',
                    textColor: 'white'
                },
                {
                    label: 'RSS',
                    link: 'https://feeds.buzzsprout.com/1942641.rss',
                    color: 'bg-gray-600',
                    hoverColor: 'hover:bg-gray-500',
                    textColor: 'white'
                },
            ]
        }
    }
});
</script>

<style lang="scss" scoped>

</style>