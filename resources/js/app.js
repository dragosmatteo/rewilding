require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue';
import VueMq from 'vue-mq';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import vmodal from 'vue-js-modal';
import VueRouter from 'vue-router'
import routes from './routes';

Vue.use(BootstrapVue);
Vue.use(vmodal, {
  dialog: true
});

Vue.use(VueMq, {
    breakpoints: {
      sm: 450,
      md: 1024,
      lg: Infinity,
    },
    defaultBreakpoint: 'sm'
  })
  Vue.use(VueRouter);
  
// other components (views are imported inside ./routes)
Vue.component('header-component', require('./components/Header.vue').default);
Vue.component('form-component', require('./components/form/Main.vue').default);
Vue.component('footer-component', require('./components/Footer.vue').default);
Vue.component('buttoncomponent', require('./components/Button.vue').default);
Vue.component('clauses-component', require('./components/Clauses.vue').default);
Vue.component('step-header-component', require('./components/StepHeader.vue').default);
Vue.component('all-companies', require('./components/AllCompanies.vue').default);
Vue.component('company-step', require('./components/CompanyStep.vue').default);
Vue.component('info', require('./components/Info.vue').default);
Vue.component('add-new-company-form', require('./components/form/AddNewCompany.vue').default);
Vue.component('edit-details-form', require('./components/form/EditDetails.vue').default);
Vue.component('custom-message', require('./components/CustomMessage.vue').default);
Vue.component('download-contract', require('./components/DownloadContract.vue').default);
Vue.component('qbox', require('./components/QuestionBox.vue').default);
Vue.component('qbox6', require('./components/QuestionBox6Lines.vue').default);
Vue.component('dbox', require('./components/DropdownBox.vue').default);
Vue.component('sbox', require('./components/SelectBox.vue').default);
Vue.component('step', require('./components/Step.vue').default);
Vue.component('support-message', require('./components/SupportMessage.vue').default);
Vue.component('all-contracts', require('./components/AllContracts.vue').default);
Vue.component('v-nav', require('./components/nav/Nav.vue').default);

const app = new Vue({
    el: '#app',

    router: new VueRouter(routes)
});
