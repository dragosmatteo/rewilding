<template>
    <div class="topic clause">
        <step-header-component :number="3" title="Clauses"></step-header-component>
        <div v-if="step === 3">
            <div class="description clauses-description">
                <div class="included-clauses">
                    <h5 class="font-weight-bold">Included Clauses</h5>
                    <draggable
                        v-model="includedList"
                        group="clauses"
                        @start="drag=true"
                        @end="drag=false"
                        class="drop-zone"
                        animation= 170
                    >
                        <div v-for="(clause, index) in includedList" :key="clause" class="drag-el flex justify-content-between align-items-center">
                            <p class="text-capitalize">{{ clause }}</p>
                            <div class="flex align-items-center">
                                <div class="numbers"><p>{{ index + 1 }}</p></div>
                                <img src="images/move-icon.png" />
                            </div>
                        </div>
                    </draggable>
                </div>

                <div class="unincluded-clauses">
                    <h5 class="font-weight-bold">Other Clauses</h5>
                    <draggable
                        v-model="unincludedList"
                        group="clauses"
                        @start="drag=true"
                        @end="drag=false"
                        class="drop-zone"
                        animation= 170
                    >
                        <div v-for="clause in unincludedList" :key="clause" class="drag-el flex justify-content-between align-items-center">
                            <p class="text-capitalize">{{ clause.replace(".txt", "") }}</p>
                            <div>
                                <img src="images/move-icon.png"></img>
                            </div>
                        </div>
                    </draggable>
                </div>
            </div>
            <buttoncomponent type="secondary" @click="prev">Back</buttoncomponent>
            <buttoncomponent type="primary next-button" v-if="myCompanies !== null" @click="next">Next</buttoncomponent>
            <slot v-else></slot>
        </div>
    </div>
</template>

<script>
import dragable from 'vuedraggable';

export default {
    props: ['jurisdictionClauses', 'step', 'contractClauses', 'myCompanies'],

    methods: {
        prev() {
            let myStep = this.step;
            myStep--;
            this.$emit("update-step", myStep);
        },

        next() {
            let myStep = this.step;
            myStep++;
            this.$emit("update-step", myStep);
        }
    },

    data() {
        return {
            includedList: [],
            unincludedList: [],
            extension: 'docx',
        }
    },

    watch: {
        contractClauses() {
            this.unincludedList = this.jurisdictionClauses.map((x) => x.name);
            this.includedList = this.contractClauses

            if(this.contractClauses !== undefined)
                this.unincludedList = this.unincludedList.filter(r => ! this.includedList.includes(r));
        },

        jurisdictionClauses() {
            this.jurisdictionClauses.map((x) => x.name)
        },

        subJurisdictionSelected() {
            this.extension = ''
        },

        includedList() {
            this.$emit("includedList", this.includedList);
        }
    }
}
</script>