<template>
    <div class="dashboard-row">
        <div class="dashboard-col">{{ parameter }}</div>
        <div class="dashboard-col">{{ value }}</div>
    </div>
</template>

<script>
export default {
    props: ['parameter', 'value']
}
</script>