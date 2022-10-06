<template>
    <div style="min-height:86vh">
        <form class="container selector-form">
            <div class="form-wrapper">
                <div class="jurisdiction">
                    <step-header-component :number="1" title="Jurisdictions"></step-header-component>
                    <div v-show="step >= 2" class="selected">
                        <p v-if="subJurisdictionSelected === ''">You've selected {{ jSelected.name }}.</p>
                        <p v-if="subJurisdictionSelected !== ''">You've selected {{ jSelected.name }} ({{subJurisdictionSelected}}).</p>
                    </div>
                    <div v-if="step === 1">
                        <select @change="getData" class="form-select form-select-lg mb-3 decorated" aria-label="Please select a jurisdiction" v-model="jSelected">
                            <option disabled value=""> Please select a jurisdiction </option>
                            <option v-for="(jurisdiction, index) in jurisdictions" v-if="jurisdiction.name !== 'README.md' && jurisdiction.type == 'dir'" :value="{ id: index, name: jurisdiction.name }"> {{ jurisdiction.name }} </option>
                        </select>
                        <transition name="fade">
                            <div class="description" v-model="jSelected" v-if="jSelected !== ''">
                                <h3 class="text-center py-1 text-white" v-if="$mq === 'lg'"> {{ jurisdictions[jSelected.id].name }} </h3>
                                <p>{{ readme }}</p>
                            </div>
                        </transition>
                        <div class="optional-jurisdiction" v-show="subJurisdictions.length > 0">
                            <support-message :message="jSelected.name + ' contains sub jurisdictions. You can optionally select one of them'" />
                            <select class="form-select form-select-lg mb-3 decorated" aria-label="Please select a sub jurisdiction" v-model="subJurisdictionSelected">
                                <option value=""> Sub jurisdiction (optional) </option>
                                <option v-for="subjurisdiction in subJurisdictions">{{ subjurisdiction.replace('.txt', '') }}</option>
                            </select>
                        </div>
                        <buttoncomponent type="primary next-button" v-if="step === 1" @click="step+=1" :disabled="jSelected === ''">Next</buttoncomponent>
                    </div>
                </div>
                <div class="topic" :class="{ topicDisabled: step < 2}">
                    <step-header-component number="2" title="Contract type"></step-header-component>
                    <div v-if="step > 2" class="selected">
                        <p>You've selected {{ tSelected.name.replace(".json", "") }}.</p>
                    </div>
                    <div v-if="step === 2" v-model="tSelected">
                        <select @change="getContractData" class="form-select form-select-lg mb-3" aria-label="Please select a contract" v-model="tSelected">
                            <option disabled value=""> Please select a contract </option>
                            <option v-for="(topic, index) in contracts" v-show="topic.name !== 'Please select a topic'" :value="{ id: index, name: topic.name }"> {{ topic.name.replace('.json', '') }} </option>
                        </select>
                        <transition name="fade">
                            <div class="description" v-model="tSelected" v-if="tSelected !== ''">
                                <div class="gradient">
                                    <h3 class="text-center py-1 text-white" v-if="$mq === 'lg'"> {{ contractSelectedData.title }} </h3>
                                </div>
                                <p> {{ contractSelectedData.description }} </p>
                            </div>
                        </transition>
                        <buttoncomponent type="secondary" @click="step--" :disabled="jSelected === ''">Back</buttoncomponent>
                        <buttoncomponent type="primary next-button" @click="step++" :disabled="tSelected === ''">Next</buttoncomponent>
                    </div>
                </div>
                <clauses-component :class="{ topicDisabled: step < 3 }" :myCompanies="mycompanies" :jurisdictionClauses="jurisdictionClauses" :contractClauses="contractSelectedData.clauses" :step="step" @update-step="updateStep" @includedList="updateList">
                    <download-contract :jSelected="jSelected.name" :tSelected="tSelected.name" :subJurisdictionSelected="subJurisdictionSelected" :includedList="includedList"></download-contract>
                </clauses-component>
                <company-step v-if="mycompanies !== null" :mycompanies="mycompanies" :step="step" @update-step="updateStep" @update-company="updateCompany">
                    <buttoncomponent type="secondary" @click="step--">Back</buttoncomponent>
                    <download-contract :jSelected="jSelected.name" :tSelected="tSelected.name" :subJurisdictionSelected="subJurisdictionSelected" :includedList="includedList" :companySelectedId="companySelectedId"></download-contract>
                </company-step>
            </div>
        </form>
    </div>

</template>

<script>

export default {
    props: ['mycompanies'],

    data() {
        return {
            jurisdictions: [],
            subJurisdictions: [],
            contracts: [],
            readme: '',
            jSelected: '',
            tSelected: '',
            step: 1,
            contractSelectedData: [],
            jurisdictionClauses: [],
            subJurisdictionSelected: '',
            companySelectedId: null,
            includedList: []
        }
    },

    methods: {
        updateStep(step) {
            this.step = step;
        },

        updateList(includedList) {
            this.includedList = includedList;
        },

        updateCompany(companySelected) {
            this.companySelectedId = companySelected;
        },

        getData() {
            this.contractSelectedData = []
            this.tSelected = '';
            this.subJurisdictionSelected = '';

            axios.get(`api/clauses?jSelected=${this.jSelected.name}`).then(response => {
                this.jurisdictionClauses = response.data
            })

            axios.get(`api/contracts?jSelected=${this.jSelected.name}`).then(response => {
                this.contracts = response.data
            })

            axios.get(`api/readme?jSelected=${this.jSelected.name}`).then(response => {
                this.readme = response.data
            })
        },

        getContractData() {
            axios.get(`api/contractSelectedData?jSelected=${this.jSelected.name}&tSelected=${this.tSelected.name}`).then(response => {
                this.contractSelectedData = response.data
            })
        }
    },

    mounted() {
        axios.get('api/jurisdictions').then(response => {
            this.jurisdictions = response.data
        });

        if((! this.mycompanies) || this.mycompanies.length < 2) {
            this.companyVisible = false;

            if(this.mycompanies !==  null && this.mycompanies.length === 1) {
                this.companySelectedId = this.mycompanies[0].id
            }
        }
    },

    watch: {
        jSelected() {
            axios.get(`api/subJurisdictions?jSelected=${this.jSelected.name}`).then(response => {
                if(response.data.hasOwnProperty('errors')) {
                    this.subJurisdictions = []
                } else {
                    this.subJurisdictions = response.data.map((x) => x.name)
                }
            })
        }
    },
}


</script>