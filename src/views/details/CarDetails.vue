<template>
  <Page v-if="car.id">
    <Header1>Car - {{ $route.params.id }}</Header1>

    <PageContent>
      <StatRow name="Plate" :value="car.plates" />

      <StatRow name="Bussy" :value="car.bussy ? 'yes' : 'no'" />

      <StatRow name="Mileage" :value="car.mileage" />

      <StatRow name="Deliveries" :value="car.deliveries?.length" />

      <StatRow name="Total delivery distance"
        :value="car.deliveries?.reduce((prev, curr) => prev + curr.distance, 0) + ' km'" />
    </PageContent>
  </Page>
</template>

<script setup>
import Header1 from '@/components/Header1.vue'
import Page from '@/components/Page.vue'
import StatRow from '@/components/StatRow.vue'
import { ApiRequest } from "@/config"
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const car = ref({});
const route = useRoute();
const router = useRouter();

const getCar = async () => {
  try {
    const { data } = await ApiRequest.get(`cars/${route.params.id}`);
    if (!data.id) return router.back();
    car.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

onMounted(() => {
  getCar();
});
</script>