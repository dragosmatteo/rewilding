<template>
    <div class="mx-auto mb-4">
        <label class="block text-sm font-medium text-gray-900 dark:text-gray-300 left float-left">{{ question }}</label>
        <div class="dbox-content" v-if="jurisdictions">        
            <select @change="setJurisdictionCountry()" class="form-select form-select-lg mb-3 rounded-lg" 
            v-model="jurisdictionCountry" @focus="showDescription('jurisdiction')" @blur="hideDescription('jurisdiction')">
                <option disabled value="">Select jurisdiction</option>
                <option v-for="jurisdiction in jurisdictions" :key="jurisdiction.id">{{ jurisdiction }}</option>
                <option>others</option>
            </select>
            <transition name="fade">
                <div class="description step2 dboxDescriptionJurisdiction" ref="dboxDescriptionJurisdiction" v-model="jurisdictionCountry"
                    style="display: none"
                >
                    <h3 class="text-center py-1 text-white"> {{ jurisdictionCountry }} </h3>
                    <p>{{ readme }}</p>
                </div>
            </transition>
        </div>
        <div class="dbox-content" v-if="minimumAgeOptions">
            <select @change="setMinimumAge()" class="form-select form-select-lg mb-3 rounded-lg" 
            v-model="minimumAge" @focus="showDescription('minAge')" @blur="hideDescription('minAge')">
                <option disabled value="">Select minimum age</option>
                <!-- <option v-for="minAge in minimumAgeOptions" :key="minAge.id">{{ minAge }}</option> -->
                <option v-for="minAge in minimumAgeOptions" :value="minAge" :key="minAge">{{ minAge }}</option>
            </select>
            <transition name="fade">
                <div class="description step1 dboxDescriptionMinimum" ref="dboxDescriptionMinimum" v-model="minimumAge"
                    style="display: none"
                >
                    <h3 class="text-center py-1 text-white"> Minimum Age </h3>
                    <p>The minimum age allowed to use the website is {{minimumAge}}</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: ['question', 'jurisdictions', 'minimumAgeOptions','prefillCompany'],
    emits:['setMinimumAge','setJurisdictionCountry'],

    data() {
        return {
            jurisdictionCountry: '',
            minimumAge:'',
            readme: '',
        }
    },

    mounted(){
        if(this.prefillCompany != undefined && this.prefillCompany != null){
            // this.minimumAge = [...this.prefillCompany];
            this.minimumAge = '18';
        }
    },
    
    methods: {
        setJurisdictionCountry() {
            axios.get(`api/readme?jSelected=${this.jurisdictionCountry}`).then(response => {
                this.readme = response.data
            })
            this.$emit('setJurisdictionCountry', this.jurisdictionCountry);
            if(this.jurisdictionCountry != '' || this.jurisdictionCountry != 'Select jurisdiction'){
                this.$refs.dboxDescriptionJurisdiction.style.display = 'block';
                this.$refs.dboxDescriptionJurisdiction.style.position = 'static';
                this.$refs.dboxDescriptionJurisdiction.style.top = null;
                this.$refs.dboxDescriptionJurisdiction.style.left = null;
                this.$refs.dboxDescriptionJurisdiction.style.width = '100%';
                document.getElementById('descriptions').appendChild(this.$refs.dboxDescriptionJurisdiction);
            }

        },
        setMinimumAge() {
            this.$emit('setMinimumAge', this.minimumAge);
            if(this.minimumAge != '' || this.minimumAge != 'Select minimum age'){
                this.$refs.dboxDescriptionMinimum.style.display = 'block';
                this.$refs.dboxDescriptionMinimum.style.position = 'static';
                this.$refs.dboxDescriptionMinimum.style.top = null;
                this.$refs.dboxDescriptionMinimum.style.left = null;
                this.$refs.dboxDescriptionMinimum.style.width = '100%';
                document.getElementById('descriptions').appendChild(this.$refs.dboxDescriptionMinimum);
            }
        },
        showDescription(forInput){
            if(forInput == 'minAge'){
                var refe = 'dboxDescriptionMinimum';
            } else {
                var refe = 'dboxDescriptionJurisdiction';
            }
            this.$refs[refe].style.display = 'block';
            this.$refs[refe].style.position = 'static';
            this.$refs[refe].style.top = null;
            this.$refs[refe].style.left = null;
            this.$refs[refe].style.width = '100%';
            document.getElementById('descriptions').appendChild(this.$refs[refe]);
        },
        hideDescription(forInput){
            if(forInput == 'minAge'){
                var refe = 'dboxDescriptionMinimum';
                var elem = '#descriptions .dboxDescriptionMinimum';

            } else {
                var refe = 'dboxDescriptionJurisdiction';
                var elem = '#descriptions .dboxDescriptionJurisdiction';
            }
            this.$refs[refe].style.display = 'none';
            document.querySelector(elem).style.display = 'none';
        },
    },
    
}
</script>