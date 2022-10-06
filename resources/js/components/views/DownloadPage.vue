<template>
    <div class="dashboard h-screen">
        <div class="dashboard-title flex align-center justify-between">
            <h2 class="font-semibold text-lg px-4 py-1 mb-0">Your contracts</h2>
            <button type="button" class="company-button pr-4" @click="downloadAll(documents)">Download all</button>
        </div>
        <div v-if="documents.length" class="grid gap-4 w-75 mx-auto mt-4 md:grid-cols-3 md:w-50">
            <div v-for="document in documents" class="rounded-md shadow-md transform hover:scale-105 transition ease-in-out duration-200">
                <div class="flex justify-between items-center bg-site rounded-t-md">
                    <h3 class="text-sm font-semibold py-1 px-3 mb-0 text-white">{{ document.name }}</h3>
                    <img @click="download(document)" src="images/download.png" alt="download image" class="w-5 h-5 mr-3 cursor-pointer" :title="'Download ' + document.name">
                </div>
                <p class="bg-neutral-500 my-1 px-3 py-2 text-xs">{{ document.company }}</p>
            </div>
        </div>
        <div v-if="!documents.length" class="h-2/6 flex items-center justify-center">
            <b-spinner class="text-site"></b-spinner>
        </div>
    </div>
</template>

<script>

import { Contract } from '../../classes/Contract.js';

export default {
    data() {
        return {
            documents: [],
        }
    },

    mounted() {
        this.getDocuments();
        // console.log('this.documents');
        // console.log(this.documents);
        this.loading = false;
    },

    methods: {
        downloadAll(contracts) {
            let contract = new Contract('/download-all', 'post', contracts, `Contracts - ${contracts[0].company}.zip`, true);
        },

        download(contract) {
            let name = `${contract.name}.${contract.extension}`;
            let documents = new Contract(`/download/${name}`, 'get', null, name, true);
        },

        async getDocuments() {
            let contract = new Contract('/download', 'post', this.$route.query, 'docx', false);
            // console.log('this.$route.query');
            // console.log(this.$route.query);
            // console.log(typeof this.$route.query);
            // console.log('contract');
            // console.log(contract);
            // console.log('AFTER contract');
            let documents = await contract.get();
            // console.log('documents');
            // console.log(documents);
            // console.log('AFTER documents');
            this.documents = documents;
            // console.log('this.documents');
            // console.log(this.documents);
            // console.log('AFTER this.documents');
        }
    }
}
</script>