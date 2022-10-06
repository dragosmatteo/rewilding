<template>
    <div class="company-step topic" :class="{ topicDisabled: step < 4 }">
        <step-header-component :number="4" title="Company"></step-header-component>
        <div v-if="step === 4">
            <select @change="sendCompany" class="form-select form-select-lg mb-3 decorated" aria-label="Please select a sub jurisdiction" v-model="companySelected">
                <option value="default"> No company selected </option>
                <option :value="{ name: company.name, id: company.id }" v-for="(company, id) in mycompanies" :key="company.name">{{ company.name }}</option>
            </select>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['step', 'mycompanies'],

    data() {
        return {
            companySelected: 'default',
        }
    },

    methods: {
        next() {
            let myStep = this.step;
            myStep++;
            this.$emit("update-step", myStep);
        },

        sendCompany() {
            this.$emit("update-company", this.companySelected.id);
        }
    }
}
</script>