<template>
  <Page v-if="product.id">
    <div class="product__up">
      <div class="up__left">
        {{ product.name }}

        <span v-if="product.category" class="up__leftCategory">
          ({{ product.category.name }})
        </span>
      </div>

      <div class="up__right">{{ product.description }}</div>
    </div>

    <div class="product__mid">
      <img :src="product.img" :alt="product.name" />
    </div>

    <div class="product__down" v-if="product.ingredients?.length">
      <h3 class="down__header">Składniki:</h3>

      <div class="down__list">
        <div v-for="ingredient in product.ingredients" :key="ingredient.id" class="down__item">
          {{ ingredient.name }}
          <span class="item__description">({{ ingredient.description }})</span>
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup>
import Page from '@/components/Page.vue'
import { ApiRequest } from "@/config"
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute();
const router = useRouter();

const product = ref({});

const getProduct = async () => {
  try {
    const { data } = await ApiRequest.get(`products/${route.params.id}`);
    if (!data.id) return router.back();
    product.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

onMounted(() => {
  if (!route.params.id || isNaN(route.params.id)) {
    alert(`Not found product with id: ${route.params.id}`);
    return router.push("/");
  }

  getProduct();
});
</script>

<style scoped>
.product__up {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

@media only screen and (min-width: 768px) {
  .product__up {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .product__up div:first-child {
    flex: 1;
  }

  .product__up div:last-child {
    text-align: right;
    flex: 2;
  }
}

.up__left {
  font-size: 24px;
  color: #f59705;
  font-weight: bold;
  letter-spacing: 2px;
}

.up__leftCategory {
  font-size: 14px;
  color: #cacaca;
}

.up__right {
  font-style: italic;
}

/* .product__mid {} */

.product__mid img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
}

@media only screen and (min-width: 768px) {
  .product__mid img {
    object-fit: contain;
  }
}

.product__down {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.down__header {
  font-size: 20px;
  color: #f59705;
}

.down__list {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
}

.down__item {
  font-size: 16px;
  color: #f59705;
}

.item__description {
  font-size: 14px;
  color: #e7e7e7;
}
</style>