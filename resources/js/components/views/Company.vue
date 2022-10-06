<template>
    <div class="company-dashboard lg:mx-8">
        <v-nav class="dashboard-nav" :title="company.name" :isCompany="true" backLink="/dashboard"></v-nav>
        <div class="dashboard mt-6">
            <div class="dashboard-data-company">
                <div class="edit-company-details">
                    <button type="button" class="btn btn-primary next-button noborder" @click="showEditCompanyModal">Edit</button>
                    <button v-if="false" type="button" class="btn btn-danger noborder" @click="openDeleteModal">Delete</button>
                </div>
                <info parameter="Company Name" :value="company.name"></info>
                <info parameter="Company Email" :value="company.email"></info>
                <info parameter="Company Address" :value="company.address"></info>
                <info v-for="info in infos" :key="info.parameter" :parameter="info.parameter" :value="info.value"></info>
            </div>
            <form v-if="visible" method="POST" action="/info" class="block new-value-form" @submit.prevent>
                <slot></slot>
                <div class="flex space-x-2 new-values">
                    <select class="select-parameter" v-model="parameter">
                    <option disabled value="">New info</option>
                        <option v-for="parameter in parameters">
                            {{ parameter }}
                        </option>
                    </select>
                    <input v-model="value" class="w-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="New value" name="value" id="value"></input>
                </div>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
                <div class="dashboard-button">
                    <!-- <button type="button" class="btn btn-secondary ml-1 noborder" @click="goToDashboard">Cancel</button>
                    <button type="button" class="btn btn-primary next-button noborder" @click="showEditCompanyModal">Edit</button>
                    <button type="button" class="btn btn-danger noborder" @click="openDeleteModal">Delete</button> -->
                    <button type="submit" class="btn btn-primary next-button noborder" @click="addNew" :disabled="parameter == '' || value == ''">Confirm</button>
                </div>
            </form>
            <div class="dashboard-button">
                <button type="button" class="btn btn-secondary ml-1 noborder" @click="goToDashboard">Cancel</button>
                <button type="button" class="btn btn-primary next-button noborder" @click="showEditCompanyModal">Edit</button>
                <button type="button" class="btn btn-danger noborder" @click="openDeleteModal">Delete</button>
                <button type="submit" class="btn btn-primary next-button noborder" @click="addNew" v-if="!visible && parameters.length > 0">New parameter</button>
            </div>
        </div>
        <modal name="new-company-modal" :adaptive="true" :maxWidth="600" :height="500">
            <edit-details-form :company="company" :infos="infos" @companyEdited="editCompany"></edit-details-form>
        </modal>
        <V-dialog /> <!-- Delete modal -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            parameter: '',
            value: '',
            infos: [],
            errors: null,
            parameters: ['Company Website', 'Product / Service'],
            infos: [],
            company: [],
            user_id: [],
        }
    },

    async created() {
        await this.getData();
        this.removeSavedParameter();
    },

    methods: {
        addNew() {
            if (this.visible === false) {
                this.visible = true
            }
            else {
                axios.post('/info', {
                        parameter: this.parameter,
                        value: this.value,
                        user_id: this.user_id,
                        company_id: this.company.id
                    })
                    .then(response => {
                        this.infos.push(response.data.information)
                    })
                    .catch(error => {
                        this.errors = error.response.data.errors
                    })

                this.removeParameter(this.parameter);
                this.parameter = '';
                this.value = '';
            }
        },

        goToDashboard(){
            window.location.href = '/dashboard';
        },

        removeParameter(parameter) { // remove parameter if is already set
            this.parameters.map((x) => {
            if(parameter === x) {
                    return this.parameters.splice(this.parameters.indexOf(x), 1)
                }
            })
        },

        removeSavedParameter() {
            this.infos.map((x) => {
                if(this.parameters.includes(x.parameter))
                    return this.parameters.splice(this.parameters.indexOf(x.parameter), 1);
            })
        },

        showEditCompanyModal() {
            this.$modal.show('new-company-modal');
        },

        editCompany(companyEdit) {
            this.company = companyEdit;
        },

        deleteCompany() {
            axios.post(`/company/${this.company.id}?_method=DELETE`)
                .then(response => {
                    location.href = '/dashboard';
                })
        },

        openDeleteModal() {
            this.$modal.show('dialog', {
                title: 'Delete company',
                text: 'Are you sure you want to delete this company? All the data assosiated with this company will be permanently removed.',
                buttons: [
                    {
                        title: 'Cancel',
                        handler: () => {
                            this.$modal.hide('dialog')
                    }
                    },
                    {
                        title: 'DELETE',
                        handler: () => {
                            this.deleteCompany()
                        }
                    }
                ]
            })
        },

        async getData() {
            await axios.get(`/company/${this.$route.params.id}/info`)
                .then(response => {
                    this.company = response.data.company
                    this.infos = response.data.infos
                    this.user_id = response.data.user_id
                }).catch(e => {
                    // company does not exist, redirect
                    window.location.href = '/dashboard';
                })
        }
    },

    watch: {
        parameters() {
            if(this.parameters.length === 0) this.visible = false;
        }
    }
}
</script>