<template>
    <div class="mx-auto mb-4 documents-additional-container">
        <label class="block text-sm font-medium text-gray-900 dark:text-gray-300 left float-left">{{ question }}</label>
        <ul class="inline-block" @change="setGenerateDocs()">
            <li v-for="contract in contracts">
                <input
                    @change="toggleDescription($event)"
                    v-model="generateDocs"
                    type="checkbox"
                    :id="`select-option-${contract.data.title}`"
                    :value="contract.name.replace('.json', '')"
                >
                <label :for="`select-option-${contract.data.title.replace(' ', '-')}`">{{ contract.data.title }}</label>
                <transition name="fade">
                    <div
                        class="description step3"
                        :ref="`sboxDescription-${contract.data.title}`"
                        :style="{top: getTopOf(contract.data.title)}"
                        style="display: none;"
                    >
                        <h3 class="text-center py-1 text-white">
                            {{ contract.data.title }}
                        </h3>
                        <p>
                            {{ contract.data.description }}
                        </p>
                    </div>
                </transition>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: [
        'question',
        'jurisdiction'
    ],

    data() {
        return {
            generateDocs: [],
            checkedNumbers: 0,
            contracts: []
        }
    },

    methods: {
        async downloadContracts() {
            // Call the API endpoint to list all the contracts and retrieve the data for each of them
            let contracts = await axios.get(`api/contracts?jSelected=${this.jurisdiction}`);
            // Each map iteration returns a promise. So we need to await all of them before continuing
            this.contracts = await Promise.all(contracts.data.map(
                async (contract) => {
                    // Get the contract data and await for the response
                    let contractData = await this.getContractData(contract.name);
                    return {
                        name: contract.name,
                        data: contractData
                    };
                }
            ));
        },
        /**
         * This calls the contract data API endpoint and returns a Promise (which needs to be await-ed)
         *  with the contract data
         * @param {string} name
         */
        getContractData(name) {
            return axios.get(`api/contractSelectedData?jSelected=${this.jurisdiction}&tSelected=${name}`).then(
                response => response.data
            );
        },
        setGenerateDocs() {
           this.$emit('setGenerateDocs', this.generateDocs);
        },
        getTopOf(value){
            let elementIndex = this.generateDocs.findIndex(el => el == value);
            if (elementIndex === -1) {
                elementIndex = 0;
            }

            return `${elementIndex * 250}px`;
        },
        toggleDescription(event){
            var ref = null;
            let contractName = event.target.id.replace('select-option-', '');
            ref = [ ...this.$refs[`sboxDescription-${contractName}`] ].shift();
            if(event.target.checked){
                ref.style.display = 'block';
                ref.style.position = 'static';
                ref.style.top = null;
                ref.style.left = null;
                ref.style.width = '100%';
                document.getElementById('descriptions').appendChild(ref);
            }else{
                ref.style.display = 'none';
            }
        }
    },

    watch: {
        jurisdiction: function(val) {
            this.downloadContracts();
        },
    }
}
</script>
<style scoped>
.documents-additional-container{
    display: flex;
    flex-direction:column;
}
</style>