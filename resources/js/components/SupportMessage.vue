<template>
    <div class="info">
        <img src="images/info.png">
        <p v-html="message"></p>
    </div>
</template>

<script>
export default {
    props: ['message']
}
</script>