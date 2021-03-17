export const state = () => ({
    items: [],
});

export const mutations = {
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

export const actions = {
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
