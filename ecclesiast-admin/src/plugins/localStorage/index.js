export default {
  install(Vue, { useLocalStorage }) {
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
    Vue.prototype.$localStorage = useLocalStorage;
    console.log('connected to [localStorage]');
  },
};
