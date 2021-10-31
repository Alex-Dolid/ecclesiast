// Constants
import { LISTENER_NAME } from './constants';

export default {
  install(Vue) {
    // // 1. add global method or property
    // Vue.myGlobalMethod = function () {
    //   // some logic ...
    // }

    // // 2. add a global asset
    // Vue.directive('my-directive', {
    //   bind (el, binding, vnode, oldVnode) {
    //     // some logic ...
    //   }
    //   ...
    // })

    // // 3. inject some component options
    // Vue.mixin({
    //   created() {
    //     //
    //   },
    // });

    // 4. add an instance method
    /* eslint-disable no-param-reassign */
    Vue.prototype.$vueSnackbar = new Vue();
    Vue.prototype.$snackbar = (message, { type } = {}) => Vue.prototype.$vueSnackbar.$emit(LISTENER_NAME, {
      type,
      message,
    });
    Vue.prototype.$scsSnackbar = (message) => Vue.prototype.$snackbar(message, { type: 'success' });
    Vue.prototype.$errSnackbar = (message) => Vue.prototype.$snackbar(message, { type: 'error' });
    Vue.prototype.$wrnSnackbar = (message) => Vue.prototype.$snackbar(message, { type: 'warning' });
    Vue.prototype.$infoSnackbar = (message) => Vue.prototype.$snackbar(message, { type: 'primary' });
    // TODO доробити, і сам компонент також, і добавити в useSnackbar
  },
};
