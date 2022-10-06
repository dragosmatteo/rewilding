<template>
    <div class="new-company-form edit-details-form">
        <form method="POST" :action="'company/' + company.id" @submit.prevent>
            <h3>Edit company details</h3>
            <div class="company-inputs">
                <label for="company-name" class="input-label">Name</label>
                <input v-model="companyEdit.name" type="text" id="company-name" name="company-name" placeholder="Orcro" autofocus>
                <label for="company-email" class="input-label">Email</label>
                <input v-model="companyEdit.email" type="email" id="company-email" name="company-email" placeholder="example@email.com">
                <label for="company-address" class="input-label">Address</label>
                <input v-model="companyEdit.address" type="text" id="company-address" name="company-address" placeholder="Orlando, Florida">
            </div>
        </form>
        <form method="POST" action="info" @submit.prevent>
            <div class="company-inputs" v-for="information in informations">
                <label :for="information.parameter" class="input-label">{{ information.parameter }}</label>
                <input v-model="information.value" type="text" :name="information.parameter" :placeholder="information.parameter">
            </div>
        </form>
        <div class="form-button flex space-x-2 edit-company-buttons">
            <button type="submit" class="btn btn-primary next-button noborder" @click="updateDetails">Save</button>
            <button type="submit" class="btn btn-secondary noborder" @click="closeModal">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['company', 'infos'],

    data() {
        return {
            companyEdit: {
                name: this.company.name,
                email: this.company.email,
                address: this.company.address
            },
            informations: [],
            endpoints: []
        }
    },

    created() {
        this.informations = this.infos
    },

    methods: {
        updateDetails() {
            axios.post(`/company/${this.company.id}?_method=PATCH`, {
                user_id: this.company.user.id,
                name: this.companyEdit.name,
                email: this.companyEdit.email,
                address: this.companyEdit.address
            })
            .then(
                this.$emit('companyEdited', this.companyEdit)
            );

            axios.all(this.informations.map((information) => axios.post('/info/' + information.id + '?_method=PATCH', {
                value: information.value
                })
            ))

            this.$modal.hide('new-company-modal')
        },

        closeModal() {
            this.$modal.hide('new-company-modal')
        }
    }
}
</script>