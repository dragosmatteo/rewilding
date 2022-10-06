<template>
    <div v-if="contracts.length" class="grid gap-4 mx-10 w-75 mt-4 md:grid-cols-3 md:w-50 mb-4">
        <div v-for="contract in contracts" class="rounded-md shadow-md transform hover:scale-105 transition ease-in-out duration-200">
            <div class="flex justify-between items-center bg-site rounded-t-md">
                <h3 class="text-sm font-semibold py-1 px-3 mb-0 text-white">{{ contract.name }}</h3>
                <img @click="download(contract)" src="images/download.png" alt="download image" class="w-5 h-5 mr-3 cursor-pointer" :title="'Download ' + contract.name">
            </div>
            <p class="bg-neutral-500 my-1 px-3 py-2 text-xs">{{ contract.company }}</p>
            <button class="btn btn-delete-contract" @click="openDeleteModal(contract.id)">
                Delete
            </button>
        </div>
        <button class="btn custom-themed-button" @click="goToHome">Create New Contract</button>
        <V-dialog /> <!-- Delete modal -->
    </div>
</template>

<script>

import { Contract } from '../classes/Contract.js';

export default {
    data() {
        return {
            contracts: []
        }
    },

    async created() {
        await this.getContracts();
    },

    methods: {
        download(contract) {
            let name = contract.path + '.' + contract.extension;
            let document = new Contract(`/download/${name}`, 'get', null, name, true);
        },

        async getContracts() {
            await axios.get('user/contracts')
                    .then(response => {
                        this.contracts = response.data.contracts;
                    })
        },
        openDeleteModal(contractId) {
            this.$modal.show('dialog', {
                title: 'Delete contract',
                text: 'Are you sure you want to delete this contract?',
                buttons: [
                    {
                        title: 'Cancel',
                        handler: () => {
                            this.$modal.hide('dialog')
                    }
                    },
                    {
                        title: 'DELETE',
                        handler: () => {
                            this.deleteContract(contractId)
                        }
                    }
                ]
            })
        },
        goToHome(){
            window.location.href = '/form-generator';
        },
        deleteContract(contractId) {
            axios.post(`/contract/${contractId}?_method=DELETE`)
                .then(response => {
                    // location.href = '/dashboard';
                    // console.log('Contract Deleted');
                    this.$modal.hide('dialog')
                });
            let newContracts = [...this.contracts];
            this.contracts = newContracts.filter(el => el.id != contractId);

        },
    }
}
</script>
<style scoped>
.btn-delete-contract{
    background: #E6523B;
    margin: 0.2em; 
    color: #fff;
}
</style>