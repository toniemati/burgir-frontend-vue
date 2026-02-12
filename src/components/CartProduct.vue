<template>
  <div v-if="product?.id" class="product">
    <div class="product__left">
      <img :src="product.img" :alt="product.name" />
    </div>

    <div class="product__right">
      <div class="content__name">
        <router-link :to="{ name: 'productDetails', params: { id: product.id } }">
          {{ product.name }}
        </router-link>
      </div>

      <div class="content__price">${{ product.price }}</div>

      <div class="content__quantity">
        <button @click="changeQuantity(props.quantity - 1)" class="quantity__button">
          -
        </button>

        <div class="quantity__value">{{ props.quantity }}</div>

        <button @click="changeQuantity(props.quantity + 1)" class="quantity__button">
          +
        </button>
      </div>

      <div class="content__sumPrice">
        ${{ (product.price * props.quantity).toLocaleString(2) }}
      </div>

      <button @click="deleteProduct" class="content__removeButton">Remove</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue"
import { useStore } from "vuex"

const store = useStore();
const product = ref({});

const props = defineProps({
  productId: Number,
  quantity: Number,
  products: Object,
});

const changeQuantity = (num) => {
  if (num < 1) return deleteProduct();

  store.dispatch("changeQuantity", {
    product_id: product.value.id,
    quantity: num,
  });
};

const deleteProduct = () => {
  store.dispatch("removeFromCart", product.value.id);
};

const setProduct = () => {
  product.value = props.products.find((p) => p.id === props.productId);
};

onMounted(() => {
  setProduct();
});
</script>

<style scoped>
.product {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.product__left {
  border-radius: 10px;
  overflow: hidden;
}

.product__left img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.product__right {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 18px;
  row-gap: 10px;
}

@media only screen and (min-width: 480px) {
  .product__right {
    justify-content: space-between;
  }
}

.content__name {
  font-size: 18px;
  font-weight: bold;
  font-style: italic;
}

.content__name a {
  text-decoration: none;
  color: #f59705;
}

.content__price {
  color: inherit;
}

.content__quantity {
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

.quantity__button {
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  padding: 3px 10px;
}

.quantity__button:hover {
  background: #f59705;
}

.quantity__value {
  color: black;
  font-weight: bold;
  padding: 0 10px;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.content__sumPrice {
  font-weight: bold;
  color: #f59705;
}

.content__removeButton {
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  background: #f59705;
  color: #eee;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.content__removeButton:hover {
  background: #eee;
  color: #f59705;
}
</style>