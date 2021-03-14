export default {
  namespaced: true,
  state: () => {
    return {
      printFormData: {}
    }
  },
  mutations: {
    updatePrintFormData(state, {formData, config}) {
      let name = _.get(config, 'name', undefined);
      console.log({formData, config, name});
      state.printFormData[name] = formData;
    }
  },
  actions: {
    lastFactorId: function ({commit}) {
      return this.$axios.$get('/factors/count').then(res => {
        return res + 1;
      }).catch(err => {
        console.log({err});
        return 1;
      })
    },
    today: function () {
      return new Promise(function (resolve) {
        return resolve(new Date().toISOString().substr(0, 10));
      })
    }
  }
}
