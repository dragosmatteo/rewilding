<template>
    <div class="company-dashboard lg:mx-8">
        <v-nav class="dashboard-nav" title="Dashboard" :isCompany="false" 
            backLink="/" @show-companies="setShowCompanies()" 
            @show-contracts="setShowContracts()"
        >
        </v-nav>
        <div class="dashboard mb-6">
            <div id="companies" v-if="showCompanies">
                <h3 class="ml-4 mt-2 font-semibold">Companies</h3>
                <all-companies></all-companies>
            </div>
            <div id="contracts" v-if="showContracts">
                <h3 class="ml-4 mt-2 font-semibold">Contracts</h3>
                <all-contracts></all-contracts>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        showCompanies: true,
        showContracts: false
      }
    },
    methods: {
        setShowCompanies(){
            this.showCompanies = true;
            this.showContracts = false;
        },
        setShowContracts(){
            this.showCompanies = false;
            this.showContracts = true;
        }
    }
}
</script>