<template>
    <button type="button" :class="'btn btn-' + type + ' noborder'" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>

export default {
    props: ['type']
}

</script>