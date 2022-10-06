<template>
    <div class="new-company-form edit-details-form">
        <form method="POST" action="/company" @submit.prevent>
            <slot></slot>
            <h3>Add your company details</h3>
            <div class="company-inputs">
                <label for="company-name" class="input-label">Name</label>
                <input v-model="name" type="text" id="company-name" name="company-name" placeholder="Orcro" autofocus>
                <label for="company-email" class="input-label">Email</label>
                <input v-model="email" type="email" id="company-email" name="company-email" placeholder="email@example.com">
                <label for="company-address" class="input-label">Address</label>
                <input v-model="address" type="text" id="company-address" name="company-address" placeholder="Orlando, Florida">
            </div>
            <div class="form-button flex space-x-2 edit-company-buttons">
                <button type="submit" class="btn btn-primary next-button noborder" @click="newCompany" :disabled="name === '' || email === '' || address === ''">Add company</button>
                <button type="submit" class="btn btn-secondary noborder" @click="closeModal">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: ['user'],

    data() {
        return {
            name: '',
            email: '',
            address: '',
        }
    },

    methods: {
        newCompany() {
            axios.post('/company', {
                user_id: this.user,
                name: this.name,
                slug: this.name.replace(" ", "-"),
                email: this.email,
                address: this.address
            })
            .then(company => {
                this.$emit('companyAdded', company.data);
            });

            this.resetInputs()
        },

        closeModal() {
            this.$modal.hide('new-company-modal')
        },

        resetInputs() {
            this.name = ''
            this.email = ''
            this.address = ''
        }
    }
}
</script>