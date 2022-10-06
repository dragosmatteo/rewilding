<template>
    <header class="header flex justify-between items-center">
        <div class="p-2 logo header-logos">
            <p class="text-white">FROSDOT from &nbsp;&nbsp;</p>
             <!-- <a href="#" aria-current="page" class="router-link-exact-active font-bold header-logo-image-link"> -->
                 <router-link :to="{ name: 'home' }" aria-current="page" class="router-link-exact-active font-bold header-logo-image-link">
                    <img src="/images/orcro-logo.png" alt="orcro logo" class="header-logo-image">
                </router-link>
            <!-- </a>   -->
            <p class="text-white" style="margin-left:-100px">in association with &nbsp; </p>
            <!-- <a href="#" aria-current="page" class="router-link-exact-active font-bold header-logo-image-link"> -->
                <router-link :to="{ name: 'home' }" aria-current="page" class="router-link-exact-active font-bold header-logo-image-link">
                    <img src="/images/moorcrofts-logo.png" alt="moorcrofts logo" class="header-logo-image">
                </router-link>
            <!-- </a> -->
        </div> 
        <div class="menu-icon mr-3">
            <img src="/images/menu.png" alt="menu-image" @click="displayOptions">
        </div>
        <transition name="fade">
            <div class="mr-2 text-white options" v-if="optionsVisible || $mq === 'lg'">
                <div v-if="isAuth" class="text-sm text-white options-wrapper">
                    <router-link :to="{ name: 'home' }" class="menu-link underline" exact>Home</router-link>
                    <router-link :to="{ name: 'form-generator'}" class="menu-link underline">Form Generator BETA</router-link>
                    <router-link :to="{ name: 'dashboard' }" class="menu-link underline">Dashboard</router-link>
                    <form method="POST" action="/logout" class="block">
                        <slot></slot>
                        <button type="submit" class="relative -t-1 menu-link underline">Log out</button>
                    </form>
                </div>
                <div v-else class="text-sm options-wrapper">
                    <router-link :to="{ name: 'home' }" class="menu-link underline" exact>Home</router-link>
                    <router-link :to="{ name: 'form-generator'}" class="menu-link underline">Form Generator BETA</router-link>
                    <router-link :to="{ name: 'login' }" class="menu-link underline">Login</router-link>
                </div>
            </div>
        </transition>
    </header>
</template>

<script>
    export default {
        props: ['isAuth'],

        data() {
            return {
                optionsVisible: false
            }
        },

        methods: {
            displayOptions() {
                this.optionsVisible = !this.optionsVisible
            }
        },

        created() {
            let self = this;

            window.addEventListener('click', function(e) {
                if(! self.$el.contains(e.target))
                    self.optionsVisible = false
            });
        }
    }
</script>
<style scoped>
header.header{
    height:3em;
}
.header-logos.logo > * {
    margin-right: 0.5em;
    margin-bottom: 0;
}

.header-logo-image-link {
    max-width:50%;
}
.header-logo-image-link .header-logo-image{
    max-width: 50%;
    margin: 0;
}

</style>