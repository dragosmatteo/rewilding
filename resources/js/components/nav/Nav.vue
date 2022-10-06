<template>
    <div class="company-nav dashboard-nav">
        <header class="dashboard-nav-header">
            <h3>{{title}}</h3>
            <router-link :to="backLink" class="menu-link underline" exact>Go Back</router-link>
        </header>
        <div class="dashboard-nav-items">
            <div class="dashboard-nav-item" :class="{active: companiesActive}">
                <button><a href="#companies" @click="showCompanies">Companies</a></button>
            </div>
            <div class="dashboard-nav-item" :class="{active: !companiesActive}">
                <button><a :href="isCompany ? '/dashboard#contracts' : '#contracts'" @click="showContracts">Contracts</a></button>
            </div>
            <!-- <div v-if="isCompany" class="dashboard-nav-item">
                <button><a href="#details">Company details</a></button>
            </div> -->
            <!-- <div class="company-nav-item">
                <button><router-link :to="{ name: 'home' }" exact>Create new contract</router-link></button>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'isCompany', 'backLink'],
    emits: ['show-companies','show-contracts'],
    data() {
      return {
        companiesActive: true
      }
    },
    methods: {
        showCompanies(){
            this.companiesActive = true;
            this.$emit('show-companies');
        },
        showContracts(){
            this.companiesActive = false;
            this.$emit('show-contracts');
        }
    }
}
</script>