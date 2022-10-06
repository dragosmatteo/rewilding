<template>
    <div class="jWrap">
        <div class="numbers"><p>{{ number }}</p></div>
        <h2 class="title">{{ title }}</h2>
    </div>
</template>

<script>
export default {
    props: ['number', 'title']
}
</script>