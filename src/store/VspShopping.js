export default {
  state: () => ({
    address: [],
  }),
  mutations: {
    addAddress(state, item) {
      state.address.push(item)
    },
    removeFromCart(state, item) {
      try {
        let index = state.address.findIndex(obj => obj.id = item.id)
        state.address.splice(index, 1)
      } catch (e) {
        console.error({e})
      }
    },
    updateAddress(state, items) {
      state.address = items;
    }
  },
  actions: {
    async addToCart({commit}, item) {
      try {
        let result;
        let user = this.$strapi.user;
        if (user) {
          await this.$strapi.$carts.create({id: item.id});
        } else {
          commit('addToCart', item);
        }
        console.log({user, result})
      } catch (e) {
        console.error({e})
      }
    },
    async loadCart({commit}) {
      try {
        let result = this.$strapi.$carts.find({user: this.$strapi.user.id})
        commit('updateCart', result);
        console.log({result})
      } catch (e) {
        console.error({e})
      }
    },
    async removeFromCart({commit}, item) {
      try {
        let result;
        let user = this.$strapi.user;
        if (user) {
          await this.$strapi.$carts.delete({id: item.id});
        } else {
          commit('removeFromCart', item);
        }
        console.log({user, result})
      } catch (e) {
        console.error({e})
      }
    },
  }
}
