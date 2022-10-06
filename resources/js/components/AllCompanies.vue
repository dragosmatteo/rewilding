<template>
    <div>
        <!-- <div class="new-company">
            <button class="underline" type="button" @click="showModal">Add new company</button>
        </div> -->
        <div class="grid gap-4 mx-10 w-75 mt-4 md:grid-cols-3 md:w-50 mb-4">
            <div v-for="company in companies" class="rounded-md shadow-md transform cursor-pointer hover:scale-105 transition ease-in-out duration-200" 
            @click.stop.prevent="goToCompany(company.id, $event)">
                <div class="flex justify-between items-center bg-site rounded-t-md">
                    <h3 class="text-sm font-semibold py-1 px-3 mb-0 text-white">{{ company.name }}</h3>
                </div>
                <p class="bg-neutral-500 my-1 px-3 py-2 text-xs">{{ company.address }}</p>
                <button class="btn btn-create-contract" @click.stop.prevent="createContractForCompany(company,$event)">
                    Create Contract
                </button>
            </div>
            <button class="btn custom-themed-button" type="button" @click="showModal">
                Add new company
            </button>
        </div>
        <modal name="new-company-modal" :adaptive="true" :maxWidth="600" :height="400">
            <add-new-company-form @companyAdded="addCompany" :user="user_id"></add-new-company-form>
        </modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            companies: [],
            user_id: null,
        }
    },

    async created() {
        await this.getCompanies();

        if(this.companies.length === 0) this.showModal();
    },

    methods : {
        showModal() {
            this.$modal.show('new-company-modal');
        },

        addCompany(company) {
            this.companies.push(company)

            this.$modal.hide('new-company-modal')
        },

        goToCompany(id, event) {
            this.$router.push({ name: 'company', params: { id } });
            event.preventDefault();
            event.stopPropagation();
        },

        createContractForCompany(company, event){
            // console.log('company create contract');
            // console.log(company);
            this.$router.push({
                name: 'home',
                query: {
                    id: company.id, 
                    address: company.address,
                    email : company.email,
                    name: company.name,
                    slug: company.slug
                }
            });
            event.preventDefault();
            event.stopPropagation();
        },

        async getCompanies() {
            await axios.get('user/companies')
                .then(response => {
                    this.companies = response.data.companies;
                    this.user_id = response.data.user;
                });
        }
    }
}
</script>
<style scoped>
.btn-create-contract{
    background: #E6523B;
    margin: 0.2em; 
    color: #fff;
}
</style>