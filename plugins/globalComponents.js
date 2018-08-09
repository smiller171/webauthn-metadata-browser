import 'vue-mdc-adapter/dist/textfield/textfield.css'
import Card from '~/components/Card.vue'
import Vue from 'vue'
import VueMDCTextfield from 'vue-mdc-adapter/dist/textfield'

Vue.component('card', Card)
Vue.use(VueMDCTextfield)
