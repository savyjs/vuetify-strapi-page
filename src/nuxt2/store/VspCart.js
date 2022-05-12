export default {
  namespaced: true,
  state: () => ({
    items: [],
  }),
  mutations: {
    addToCart(state, item) {
      state.items.push(item)
    },
    removeFromCart(state, item) {
      try {
        let index = state.items.findIndex(obj => obj.id = item.id)
        state.items.splice(index, 1)
      } catch (e) {
        console.error({e})
      }
    },
    updateCart(state, items) {
      state.items = items;
    }
  }
  , actions: {
    async addToCart({commit,dispatch}, item) {
      try {
        let result;
        try {
          await this.$axios.$post(this.$vsp.shop.cartUrl, {id: item.id});
          await dispatch('loadCart');
        } catch (e) {
          commit('addToCart', item);
        }
      } catch (e) {
        console.error({e})
      }
    },
    async removeFromCart({commit,dispatch}, item) {
      try {
        let result;
        try {
          await this.$axios.$delete(this.$vsp.shop.cartUrl, {id: item.id});
          await dispatch('loadCart');
        } catch (e) {
          commit('removeFromCart', item);
        }
      } catch (e) {
        console.error({e})
      }
    },
    async loadCart({commit}) {
      try {
        let result = await this.$axios.$get(this.$vsp.shop.cartUrl, {user: this.$auth.user.id})
        commit('updateCart', result);
        console.log({result})
      } catch (e) {
        console.error({e})
      }
    },
  }
}
