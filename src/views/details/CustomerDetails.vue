<template>
  <Page v-if="customer.id">
    <Header1>Customer - {{ $route.params.id }}</Header1>

    <PageContent>
      <StatRow name="First name" :value="customer.first_name" />

      <StatRow name="Last name" :value="customer.last_name" />

      <StatRow name="Country" :value="customer.country" />

      <StatRow name="City" :value="customer.city" />

      <StatRow name="City" :value="customer.city" />

      <StatRow name="Street" :value="customer.street" />

      <StatRow name="House number" :value="customer.house_number" />

      <StatRow name="Phone" :value="customer.telephone" />

      <StatRow name="Email" :value="customer.email" />

      <StatRow name="Number of orders" :value="customer.orders?.length" />

      <StatRow name="Total products ordered"
        :value="customer.orders?.reduce((prev, curr) => prev + curr.products.length, 0)" />

      <StatRow name="Total orders price"
        :value="'$' + customer.orders?.reduce((prev, curr) => prev + curr.products.reduce((prev, curr) => prev + curr.price, 0), 0).toFixed(2)" />
    </PageContent>
  </Page>
</template>

<script setup>
import Header1 from '@/components/Header1.vue'
import Page from '@/components/Page.vue'
import PageContent from '@/components/PageContent.vue'
import StatRow from '@/components/StatRow.vue'
import { ApiRequest } from "@/config"
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const customer = ref({});
const route = useRoute();
const router = useRouter();

const getCustomer = async () => {
  try {
    const { data } = await ApiRequest.get(`customers/${route.params.id}`);
    if (!data.id) return router.back();
    customer.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

onMounted(() => {
  getCustomer();
});
</script>