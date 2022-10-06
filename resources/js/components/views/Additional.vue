<template>
    <!-- <div class="w-100 mx-auto mt-6 selector-form"> -->
    <div class="w-100 mt-6 selector-form" style="display:flex;">
        <!-- <div class="w-80 mx-auto form-wrapper"> -->
        <div class="mx-auto form-wrapper" style="width:35%;">
            <iframe name="download" style="display:none;"></iframe>
            <form target="download" ref="form" action="javascript:void(0)">
                <step :completed="steps[0].completed" :currentStep="currentStep" title="Initial Questions" number="1" class="jurisdiction" @stepChanged="updateStep($event)" :next="true" :back="false">
                    <qbox :prefillCompany="this.$route.query.name" placeholder="business_name" @setData="getQuestionData($event)" question="What's the legal name of the business?" questionNumber="1" />
                    <qbox :prefillCompany="this.$route.query.name" ref="tradingName" @setData="getQuestionData($event)" questionNumber="2" />
                    <qbox6 :prefillCompany="this.$route.query.address" ref="registeredAddress" @setData="getQuestionData($event)" :question="'What is ' + form.businessName + ' registered address?'" questionNumber="3" />
                    <qbox6 :prefillCompany="this.$route.query.address" ref="tradingAddress" @setData="getQuestionData($event)" :question="'What is ' + form.businessName + ' trading address?'" questionNumber="4" />
                    <qbox :prefillCompany="getCompanyWebsite" ref="websiteAddress" @setData="getQuestionData($event)" :question="'What is the address of your website?'" questionNumber="5" />
                    <qbox :prefillCompany="this.$route.query.email" ref="generalEmail" @setData="getQuestionData($event)" :question="'What is your general email address?'" questionNumber="6" />
                    <qbox :prefillCompany="this.$route.query.address" ref="generalTel" @setData="getQuestionData($event)" :question="'What is your contact telephone number?'" questionNumber="7" />
                    <qbox :prefillCompany="getCompanyProductServices" ref="servicesDescription" @setData="getQuestionData($event)" :question="'Please provide a short description of your website and its services.'" questionNumber="8" />
                    <dbox :prefillCompany="this.$route.query.address" ref="minimumAge" :minimumAgeOptions="minimumAgeOptions" @setMinimumAge="getMinimumAge($event)" :question="'What is the minimum age tp use your website?'" />
                    <support-message v-if="form.businessName && !form.tradingName" :message="'Provider means <b>' + form.businessName + '</b>.'" />
                    <support-message v-if="form.businessName && form.tradingName && !form.tradingAddress" :message="'Provider means <b>' + form.businessName + '</b> doing business as <b>' + form.tradingName + '</b>.'" />
                    <support-message v-if="form.businessName && form.tradingName && form.tradingAddress" :message="'Provider means <b>' + form.businessName + '</b> doing business as <b>' + form.tradingName + '</b> whose principal place of business is <b>' + form.tradingAddress + '</b>.'" />
                </step>

                <step :completed="steps[1].completed" :currentStep="currentStep" title="Jurisdiction" number="2" class="jurisdiction" @stepChanged="updateStep($event)" :next="true" :back="true">
                    <dbox :jurisdictions="jurisdictions" @setJurisdictionCountry="getJurisdictionCountry($event)" :question="'What is the country (legal jurisdiction) where ' + form.businessName + ' is based?'" />
                </step>

                <step :completed="steps[2].completed" :currentStep="currentStep" title="Documents" number="3" class="jurisdiction" @stepChanged="updateStep($event)" :next="false" :back="true" :generate="true" @newContract="download">
                    <sbox @setGenerateDocs="getGenerateDocs($event)" question="What documents would you like to generate?" :jurisdiction="selectedJurisdiction" />
                </step>
            </form>
        </div>
        <div id="descriptions" class="mx-auto form-wrapper" style="width:35%;"></div>
    </div>
</template>

<script>

import { Form } from '../../classes/Form.js';
import { Contract } from '../../classes/Contract.js';

export default {
    data() {
        return {
            form: new Form({
                businessName: '',
                tradingName: '',
                tradingAddress: '',
                jurisdictionCountry: '',
                generateDocs: [],
                contractType: 'additional'
            }),
            minimumAgeOptions: ['18', '13', 'any age'],
            jurisdictions: [],
            steps: [
                {
                    number: 1,
                    completed: false
                },
                {
                    number: 2,
                    completed: false
                },
                {
                    number: 3,
                    completed: false
                }
            ],
            fakeBusinessName: '<business_name>',
            currentStep: 1,
            prefillCompany : {},
            companyInfos: [],
            companyWebsite: {},
            productService: {},
            selectedJurisdiction: '',
        }
    },
    async created(){
        if((typeof this.$route.query == 'object' &&  Object.keys(this.$route.query).length != 0) || (this.$route.query != null && this.$route.query != undefined)){
            this.prefillCompany = this.$route.query;
        }

        if(this.$route.query && this.$route.query != null && this.$route.query != undefined && this.$route.query.id){
            await this.getCompanyInfos();
        } else {
            console.log('no prefil');
        }
    },

    mounted() {
        axios.get('api/jurisdictions')
            .then(response => {
                this.jurisdictions = response.data.filter(el => el.type == 'dir').flatMap(({ name }) => (name !== 'README.md') ? name : [])
            });
        this.$refs.tradingName.$refs.label.textContent = "What's the trading name of the " + this.fakeBusinessName + '?';
        this.$refs.tradingAddress.$refs.label.textContent = "What's the " + this.fakeBusinessName + " trading address?"
        // if((typeof this.$route.query == 'object' &&  Object.keys(this.$route.query).length != 0)){
        //     this.steps[0].completed = true;
        // }
    },

    methods: {
        getQuestionData(question) {
            if(question.id == 1) {
                this.form.businessName = this.fakeBusinessName = question.response;
                (this.form.businessName == '') ? this.fakeBusinessName = '<business_name>' : [];
            } else if(question.id == 2) {
                this.form.tradingName = question.response;
            } else if(question.id == 3) {
                this.form.registeredAddress = question.response;
            } else if(question.id == 4) {
                this.form.tradingAddress = question.response;
            } else if(question.id == 5) {
                this.form.websiteAddress = question.response;
            } else if(question.id == 6) {
                this.form.generalEmail = question.response;
            } else if(question.id == 7) {
                this.form.generalTel = question.response;
            } else if(question.id == 8) {
                this.form.servicesDescription = question.response;
            }

            (this.form.tradingAddress !== '' && this.form.tradingName !== '' && this.form.businessName !== '') ? this.steps[0].completed = true : this.steps[0].completed = false;
        },

        async getCompanyInfos(){
            if(this.$route.query.id != undefined && this.$route.query.id != null && this.$route.query.id){
                await axios.get(`/company/${this.$route.query.id}/info`)
                    .then(response => {
                        this.companyInfos = [...response.data.infos];
                        this.companyWebsite = response.data.infos.find(info => info.parameter == 'Company Website');
                        this.productService = response.data.infos.find(info => info.parameter == 'Product / Service');
                        if((this.companyInfos && this.companyWebsite && this.productService) &&
                        ((typeof this.companyInfos === 'object' && Object.keys(this.companyInfos).length !== 0) && (typeof this.companyInfos === 'object' && Object.keys(this.productService).length !== 0) && (typeof this.companyInfos === 'object' && Object.keys(this.companyWebsite).length !== 0)) &&
                        (this.companyInfos != undefined && this.companyWebsite != undefined && this.productService != undefined) &&
                        (this.companyInfos != null && this.companyWebsite != null && this.productService != null)){
                            this.steps[0].completed = true;
                        }
                    }).catch(e => {
                        // company does not exist, redirect
                        window.location.href = '/dashboard';
                    });
                this.form.businessName = this.$route.query.name;
                this.form.tradingName = this.$route.query.name;
                this.form.registeredAddress = this.$route.query.address;
                this.form.tradingAddress = this.$route.query.address;
                this.form.websiteAddress = this.companyWebsite;
                this.form.generalEmail = this.$route.query.email;
                this.form.generalTel = this.$route.query.address;
                this.form.servicesDescription = this.productService;
                this.form.minimumAge = '18';
            }
        },

        getJurisdictionCountry(name) {
            this.selectedJurisdiction = name;
            this.form.jurisdictionCountry = name;

            (this.form.jurisdictionCountry) ? this.steps[1].completed = true : this.steps[1].completed = false;
        },
        getMinimumAge(age) {
            this.form.minimumAge = age;

            // (this.form.minimumAge) ? this.steps[1].completed = true : this.steps[1].completed = false;
        },

        getGenerateDocs(docs) {
            this.form.generateDocs = docs;

            (this.form.generateDocs.length) ? this.steps[2].completed = true : this.steps[2].completed = false;
        },

        updateStep(step) {
            this.currentStep = step;
        },

        download(extension) {
            this.$refs.form.submit();
            this.form.output = extension;
            let name = `${this.form.businessName}`;

            // if user wants to create one single doc, download it directly
            // otherwise create a new page with individual downloads
            if(this.form.generateDocs.length > 1) {
                let params = new URLSearchParams(this.form);
                let query = params.toString();

                // console.log('type is ');
                // console.log(typeof query);
                this.$router.push({
                    name: 'download-page',
                    query: query
                });
            } else {
                let contract = new Contract('/download', 'post', this.form, name);
            }
        }
    },

    watch: {
        fakeBusinessName() {
            this.$refs.tradingName.$refs.label.textContent = "What's the trading name of the " + this.fakeBusinessName + '?';
            this.$refs.tradingAddress.$refs.label.textContent = "What's the " + this.fakeBusinessName + " trading address?"
        }
    },

    computed: {
        getCompanyWebsite(){
            if(this.companyWebsite && this.companyWebsite != undefined && this.companyWebsite!=null && this.companyWebsite.value)
                return this.companyWebsite.value;
            else
                return '';
        },

        getCompanyProductServices(){
            if(this.productService && this.productService != undefined && this.productService!=null && this.productService.value)
                return this.productService.value;
            else
                return '';
        },
    }
}
</script>
<!-- <style scoped>
@media (min-width: 991px) {
    .description {
        background: whitesmoke;
        /* position: absolute; */
        /* top: 0; */
        /* left: 510px; */
        width: 100%;
    }
    .description p {
        padding: 0 10px;
    }
}
</style> -->