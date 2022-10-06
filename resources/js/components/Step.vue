<template>
    <div>
        <step-header-component :number="number" :title="title"></step-header-component>
        <div v-show="step == currentStep">
            <slot></slot>
            <buttoncomponent type="secondary" v-if="back" @click="updateStep(value = Number(step) - 1)">Back</buttoncomponent>
            <buttoncomponent type="primary next-button" v-if="next" @click="updateStep(value = Number(step) + 1)" :disabled="!completed">Next</buttoncomponent>
            <download-contract v-if="generate" :disabled="!completed" :additional="true" @generateContract="generateContract($event)">Generate</download-contract>
        </div>
    </div>
</template>

<script>
export default {
    props: ['number', 'title', 'back', 'next', 'completed', 'currentStep', 'generate'],

    data() {
        return {
            step: 1,
        }
    },

    mounted() {
        this.step = this.number
    },

    methods: {
        updateStep(id) {
            if(id == 1)
            {
                let childElements = document.querySelectorAll("#descriptions > *" );
                childElements.forEach(el => el.style.display = 'none');
                let childStep1 = document.querySelectorAll("#descriptions > .step1");
                childStep1.forEach(el =>el.style.display='block');
                document.querySelectorAll("#descriptions > .step1").forEach(el =>el.style.display='block');
            } else if(id == 2) {
                let childElements = document.querySelectorAll("#descriptions > *" );
                childElements.forEach(el => el.style.display = 'none');
                document.querySelectorAll("#descriptions > .step2").forEach(el =>el.style.display='block');
            } else if(id == 3) {
                let childElements = document.querySelectorAll("#descriptions > *" );
                childElements.forEach(el => el.style.display = 'none');
                document.querySelectorAll("#descriptions > .step3").forEach(el =>el.style.display='block');
            }
            this.$emit('stepChanged', id);
        },

        generateContract(extension) {
            this.$emit('newContract', extension);
        }
    }
}
</script>