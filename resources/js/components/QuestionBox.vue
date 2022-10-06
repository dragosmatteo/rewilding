<template>
    <div class="mx-auto mb-4">
        <label ref="label" :for="'qbox' + questionData.id" class="block text-sm font-medium text-gray-900 dark:text-gray-300 left float-left">{{ question }}</label>
        <input ref="input" @focus="showDescription" @blur="hideDescription" :placeholder="placeholder" v-model="questionData.response" @keyup="setData($event)" type="text" :name="'qbox' + questionData.id" :id="'qbox' + questionData.id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg h-8 w-100 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <transition name="fade">
            <div class="description step1" :class="'qboxDescription' + questionData.id" :ref="'qboxDescription' + questionData.id" v-model="questionData.response"
                :style="{top:questionData.id != 1 ? (questionData.id * 100) + 50 + 'px' : '0px;', display: true ? 'none':'block'}"
            >
                <h3 class="text-center py-1 text-white">
                    <span style="font-size:medium">{{this.getTitle(questionData.id)}}</span> 
                    <strong>{{questionData.response}}</strong>
                </h3>
                <p>{{this.getDescription(questionData.id)}}</p>
            </div>
        </transition>
    </div>
</template>

<script>

class Question {
    constructor(data) {
        for(let field in data) {
            this[field] = data[field]
        }
    }
}

export default {
    props: ['question', 'questionNumber', 'placeholder', 'prefillCompany'],

    data() {
        return {
            questionData: new Question({
                id: this.questionNumber,
                response: '',
            })
        }
    },

    created(){
        if(this.prefillCompany != undefined && this.prefillCompany != null){
            this.questionData.response = this.prefillCompany;
        }
    },

    watch: {
        prefillCompany: function(newVal, oldVal){
            if((newVal != undefined && newVal != null) && 
            (this.questionData.response == null || this.questionData.response == '' || this.questionData.response.length == 0)){
                this.questionData.response = newVal;
            }
        }
    },

    methods: {
        setData() {
            this.$emit('setData', this.questionData);
        },
        showDescription(){
            let refe = 'qboxDescription' + this.questionData.id;

            this.$refs[refe].style.display = 'block';
            this.$refs[refe].style.position = 'static';
            this.$refs[refe].style.top = null;
            this.$refs[refe].style.left = null;
            this.$refs[refe].style.width = '100%';
            document.getElementById('descriptions').appendChild(this.$refs[refe]);
        },
        hideDescription(){
            let refe = 'qboxDescription' + this.questionData.id;
            let elem = '#descriptions .qboxDescription' + this.questionData.id;
            this.$refs[refe].style.display = 'none';
            document.querySelector(elem).style.display = 'none';
        },
        getDescription(question_id) {
            if(question_id == 1){
                return 'A “legal name” is the name that appears on the formation document of a corporation, LLC, LP or other statutory business entity. The name appearing at the time of formation is its original legal name. A business entity may change its legal name as often as it desires during the course of its existence.<br> However, it can have only one legal name at any given time.';
            }
            if(question_id == 2){
                return 'A trading name is the name (or names) used by a person, partnership or company for carrying out business which is not the same as their own name or official registered name. A business may use as many trading names as it requires, but these cannot be registered as official names of the company. They are often used for marketing purposes to distinguish one division of the company from another.';
            } 
            if(question_id == 5){
                return 'The website Address is the complete URL of the website.';
            }
            if(question_id == 6){
                return 'The General Email is the main contact email';
            }
            if(question_id == 7){
                return 'The General Telephone Number is the main contact phone number';
            }
            if(question_id == 8){
                return 'Just briefly present the services provided trough the website.';
            }
            
        },
        getTitle(question_id){
            if(question_id == 1){
                return 'Legal Name Of The Business: ';
            }
            if(question_id == 2){
                    return 'Trading Name: ';
            }
            if(question_id == 5){
                    return 'Website Address: ';
            }
            if(question_id == 6){
                    return 'General Email: ';
            }
            if(question_id == 7){
                    return 'General Phone Number: ';
            }
            if(question_id == 8){
                    return 'Website Description and its Services: '
            }
        }
    },
}
</script>