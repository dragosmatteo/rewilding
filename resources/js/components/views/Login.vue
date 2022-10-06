<template></template>

<script>
export default {
    created() {
        axios.get('/redirectToAuth')
            .then(response => {
                window.location.href = response.data
            });
    }
}
</script>