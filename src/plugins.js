import BootstrapVue from 'bootstrap-vue'
import injector from '@/service-provider'
import ru from 'vee-validate/dist/locale/ru'
import VeeValidate, { Validator } from 'vee-validate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Validator.localize('ru', ru)

export default {
  BootstrapVue: BootstrapVue,
  injector: injector,
  VeeValidate: VeeValidate
}
