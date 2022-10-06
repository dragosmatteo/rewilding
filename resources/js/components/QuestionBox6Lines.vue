<template>
    <div class="mx-auto mb-4">
        <label ref="label" :for="'qbox' + questionData.id" class="block text-sm font-medium text-gray-900 dark:text-gray-300 left float-left">{{ question }}</label>
        <textarea ref="input" @focus="showDescription" @blur="hideDescription" :placeholder="placeholder" v-model="questionData.response" @keyup="setData($event)" type="text" :name="'qbox' + questionData.id" :id="'qbox' + questionData.id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-8 w-100 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </textarea>
        <transition name="fade">
            <div class="description step1" :class="'qbox6Description' + questionData.id" :ref="'qbox6Description' + questionData.id" v-model="questionData.response"
                :style="{top:questionData.id == 3 ? '520px' : questionData.id==4 ? '740px' : '', display: true ? 'none':'block'}"
            >
                <h3 class="text-center py-1 text-white">
                    <span style="font-size:medium">{{questionData.id == 3 ? 'Registered Address' : questionData.id == 4 ? 'Trading Address:' : ''}}</span> 
                    <!-- <span style="font-size:medium" v-else>Trading Address:</span>  -->
                    <strong>{{questionData.response}}</strong>
                </h3>
                <p v-if="questionData.id==3">The purpose of a registered address, otherwise known as a service address, is to act as the official address and point of contact for your limited company or limited liability partnership for government agencies such as Companies House and HMRC</p>
                <p v-if="questionData.id==4">A trading address is where your customers, banks or suppliers send you correspondence and can be different to the company’s registered address, therefore it doesn’t have to be public information.</p>
            </div>
        </transition>
    </div>
</template>

<script>

class QuestionText {
    constructor(data) {
        for(let field in data) {
            this[field] = data[field]
        }
    }
}

export default {
    props: ['question', 'questionNumber', 'placeholder','prefillCompany'],

    data() {
        return {
            questionData: new QuestionText({
                id: this.questionNumber,
                response: '',
            })
        }
    },

    mounted(){
        // console.log('this.questionData.response');
        // console.log(this.questionData.response);
        // console.log('this.prefillCompany');
        // console.log(this.prefillCompany);
        if(this.prefillCompany != undefined && this.prefillCompany != null){
            this.questionData.response = this.prefillCompany;
        }
    },

    methods: {
        setData() {
            this.$emit('setData', this.questionData);
            // if(this.questionData.response.length > 0){
            //     this.$refs.qbox6Description.style.display = 'block';
            //     this.$refs.qbox6Description.style.position = 'static';
            //     this.$refs.qbox6Description.style.top = null;
            //     this.$refs.qbox6Description.style.left = null;
            //     this.$refs.qbox6Description.style.width = '100%';
            //     document.getElementById('descriptions').appendChild(this.$refs.qbox6Description);
            // }
        },
         showDescription(){
            let refe = 'qbox6Description' + this.questionData.id;

            this.$refs[refe].style.display = 'block';
            this.$refs[refe].style.position = 'static';
            this.$refs[refe].style.top = null;
            this.$refs[refe].style.left = null;
            this.$refs[refe].style.width = '100%';
            document.getElementById('descriptions').appendChild(this.$refs[refe]);
        },
        hideDescription(){
            let refe = 'qbox6Description' + this.questionData.id;
            let elem = '#descriptions .qbox6Description' + this.questionData.id;
            this.$refs[refe].style.display = 'none';
            document.querySelector(elem).style.display = 'none';
        },
    }
}
</script>
<style scoped>
textarea {
    height:100%;
}
</style>