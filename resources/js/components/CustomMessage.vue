<template>
    <transition name="fade">
        <div class="custom-message" v-show="visible">{{message}}</div>
    </transition>
</template>

<script>
export default {
    props: ['message'],

    data() {
        return {
            visible: true
        }
    },

    created() {
        setTimeout(() => this.visible = false, 4000)
    }
}
</script>