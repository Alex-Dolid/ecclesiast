// Hooks
import { useLocalStorage } from '@/hooks';
// Constants
import { LOCAL_USER, USER_ABILITY } from '@/constants';

export const LocalStorage = () => useLocalStorage([LOCAL_USER, USER_ABILITY]);

export default {
  install(Vue, { MyLocalStorage }) {
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
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$localStorage = MyLocalStorage;
    console.log('connected to [localStorage]');
  },
};
