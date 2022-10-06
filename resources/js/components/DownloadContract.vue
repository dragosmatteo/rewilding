<template>
    <div class="btn-group">
        <buttoncomponent type="primary next-button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Download Contract</buttoncomponent>
        <div class="dropdown-menu">
            <input class="d-none" type="radio" id="odt" value="odt" v-model="extension"  @change="download_contract">
            <label for="odt" class="dropdown-item">ODText (.odt)</label>
            <input class="d-none" type="radio" id="docx" value="docx" v-model="extension" @change="download_contract">
            <label for="docx" class="dropdown-item">Word2007 (.docx)</label>
            <input class="d-none" type="radio" id="pdf" value="pdf" v-model="extension" @change="download_contract">
            <label for="pdf" class="dropdown-item">PDF</label>
            <input class="d-none" type="radio" id="rtf" value="rtf" v-model="extension" @change="download_contract">
            <label for="rtf" class="dropdown-item">RTF</label>
        </div>
    </div>
</template>

<script>
export default {
    props: ['jSelected', 'tSelected', 'subJurisdictionSelected', 'companySelectedId', 'includedList', 'additional'],

    data() {
        return {
            extension: null
        }
    },

    methods: {
        download_contract() {
            if(this.additional) {
                this.$emit('generateContract', this.extension);

                return;
            }
            axios({
                url: `generateDocument?jSelected=${this.jSelected}&tSelected=${this.tSelected}&clausesSelected=${this.includedList}&subJurisdictionSelected=${this.subJurisdictionSelected.replace("&", "%26")}&output=${this.extension}&companySelectedId=${this.companySelectedId}`,
                method: 'GET',
                responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    if(this.subJurisdictionSelected !== "") {
                        link.setAttribute('download', `${this.jSelected} (${this.subJurisdictionSelected}) - ${this.tSelected.replace('.json', '')}.${this.extension}`);
                    } else {
                        link.setAttribute('download', `${this.jSelected} - ${this.tSelected.replace('.json', '')}.${this.extension}`);
                    }
                    document.body.appendChild(link);
                    link.click();
            });
        }
    }
}
</script>