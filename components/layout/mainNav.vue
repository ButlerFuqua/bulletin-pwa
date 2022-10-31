<template>
    <div>
        <button @click="toggleMenu()"
            class="bg-green-400 hover:bg-green-600 transition-all z-20 fixed right-2 top-2 p-2 rounded">
            Menu
        </button>
        <div :class="closed ? 'closed' : 'right-0'"
            class="fixed top-0 w-full h-full z-10 bg-gray-800 transition-all ease-in-out shadow">
            <!-- This isn't currently needed -->
            <!-- <div data-netlify-identity-menu></div> -->
            <!-- <hr class="my-2"> -->
            <div v-if="navItems" class="w-full flex items-center flex-col">
                <ul>
                    <li :class="navItem.active ? 'text-yellow-400' : 'text-purple-600'"
                        class="cursor-pointer my-5 text-5xl font-black  hover:text-purple-500 transition-all"
                        v-for="navItem in navItems" :key="navItem.label" @click="navAction(navItem)">
                        {{navItem.label}}
                    </li>
                </ul>
            </div>
            <FullLoader v-else />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FullLoader from './fullLoader.vue'

const askAQuestionLink: string = process.env.askAQuestionLink || '/';

type Data = {
    navItems: null | NavItem[]
    closed: boolean
    articlesDisplayName: string | null
}

export enum NavType {
    nativeLink,
    internalNewTab,
    externalPage
}
export type NavItem = {
    path: string
    label: string
    type: NavType
    active?: boolean
}
export default Vue.extend({
    name: "MainNav",
    components: { FullLoader },
    data(): Data {
        return {
            closed: true,
            navItems: null,
            articlesDisplayName: null,
        };
    },
    methods: {
        async loadNavItems() {
            this.articlesDisplayName = process.env.articlesDisplayName || "Articles";
            this.navItems = [
                {
                    path: "/",
                    label: "Home",
                    type: NavType.nativeLink,
                    active: false
                },
                {
                    path: askAQuestionLink,
                    label: "Ask a question",
                    type: NavType.externalPage,
                    active: false
                },
                // {
                //     path: "/articles",
                //     label: this.articlesDisplayName,
                //     type: NavType.nativeLink,
                //     active: false
                // },
                {
                    path: "/podcast",
                    label: "Podcast",
                    type: NavType.nativeLink,
                    active: false
                },
                {
                    path: "/updates",
                    label: 'Updates',
                    type: NavType.nativeLink,
                    active: false
                },
            ];
        },
        toggleMenu() {
            this.closed = !this.closed;
            this.navItems?.forEach(item => item.active = false);
            if (this.closed)
                return;
            const path = this.$route.path;
            if (path === "/") {
                const home = this.navItems?.find(item => item.path === "/");
                if (home) {
                    home.active = true;
                }
                return;
            }
            let active = this.navItems?.find(item => path.includes(item.path) && item.path !== "/");
            if (active) {
                active.active = true;
            }
        },
        navAction(navItem: any) {
            switch (navItem.type) {
                case NavType.nativeLink:
                    this.$nuxt.$router.push(navItem.path);
                    this.closed = true;
                    break;
                case NavType.internalNewTab:
                    let routeData = this.$router.resolve({ name: navItem.path, });
                    window.open(routeData.href, "_blank");
                    break;
                case NavType.externalPage:
                    this.toggleMenu();
                    window.open(navItem.path, "_blank");
                    break;
                default:
                    console.error(`nav type not covered`, navItem);
                    break;
            }
        },
    },
    async beforeMount() {
        await this.loadNavItems();
    }
})
</script>

<style lang="scss" scoped>
.closed {
    right: 100vw;
}
</style>