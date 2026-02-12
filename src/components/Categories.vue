<template>
  <div class="categories">
    <div class="category" v-for="category in categories" :key="category.id">
      <h2 class="category__name">{{ category.name }}</h2>

      <div class="category__products">
        <CategoriesProduct v-for="product in category.products" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ApiRequest } from "@/config"
import { onMounted, ref } from "vue"
import CategoriesProduct from './CategoriesProduct.vue'

const categories = ref([]);

const getCategories = async () => {
  try {
    const { data } = await ApiRequest.get('categories')
    categories.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

onMounted(() => {
  getCategories();
});
</script>

<style scoped>
.categories {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.category {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px dashed #f59705;
}

.category__name {
  color: #f59705;
}

.category__products {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>