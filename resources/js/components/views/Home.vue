<template>
    <form-component :mycompanies="userCompanies"></form-component>
</template>

<script>
export default {
    data() {
        return {
            userCompanies: []
        }
    },

    created() {
        this.getUserCompanies()
    },

    methods: {
        getUserCompanies() {
            axios.get('user/companies')
                .then(response => this.userCompanies = response.data.companies)
        }
    }
}
</script>