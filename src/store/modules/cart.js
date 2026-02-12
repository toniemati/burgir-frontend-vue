import { ApiRequest } from '../../config';

export const cart = {
  state: () => ({
    customer_id: 1,
    products: [
      // { product_id: 1, quantity: 1 },
      // { product_id: 6, quantity: 1 },
      // { product_id: 10, quantity: 1 }
    ]
  }),
  getters: {
    getCart: (state) => state
  },
  mutations: {
    addToCart: (state, payload) => {
      if (state.products.map(p => p.product_id).includes(payload)) {
        state.products = state.products.map(p => {
          if (p.product_id === payload) p.quantity++;
          return p;
        })
      } else {
        state.products.push({
          product_id: payload,
          quantity: 1
        });
      }

      alert('Added to your cart 🛒');
    },
    removeFromCart: (state, payload) => {
      state.products = state.products.filter(p => p.product_id !== payload);
    },
    changeQuantity: (state, payload) => {
      state.products = state.products.map(p => {
        if (p.product_id === payload.product_id) {
          p.quantity = payload.quantity;
        }
        return p;
      })
    },
    setCustomer: (state, payload) => {
      state.customer_id = payload;
    },
    order: (state) => {
      state.customer_id = 1;
      state.products = [];
    }
  },
  actions: {
    addToCart: (context, payload) => {
      context.commit('addToCart', payload);
    },
    removeFromCart: (context, payload) => {
      context.commit('removeFromCart', payload);
    },
    changeQuantity: (context, payload) => {
      context.commit('changeQuantity', payload);
    },
    setCustomer: (context, payload) => {
      context.commit('setCustomer', payload);
    },
    order: async (context) => {
      try {
        const response = await ApiRequest.post('orders', context.state);
        context.commit('order', response.data);
        alert('Order placed 🍔🍟');
      } catch (error) {
        console.error(error)
        alert('Failed to place order 😥');
      }
    }
  }
}