<template>
  <Page v-if="delivery.id">
    <header1>Delivery - {{ $route.params.id }}</header1>

    <PageContent>
      <StatRow name="Distance" :value="delivery.distance" />

      <StatRow name="Delivered" :value="delivery.delivered ? 'yes' : 'no'" />

      <StatRow name="Employee">
        <router-link :to="{ name: 'employeeDetails', params: { id: delivery.employee?.id } }">
          {{ delivery.employee?.first_name }}
          {{ delivery.employee?.last_name }}
        </router-link>
      </StatRow>

      <StatRow name="Car">
        <router-link :to="{ name: 'carDetails', params: { id: delivery.car?.id } }">
          {{ delivery.car?.plates }}
        </router-link>
      </StatRow>
    </PageContent>
  </Page>
</template>

<script setup>
import Header1 from '@/components/Header1.vue'
import Page from '@/components/Page.vue'
import PageContent from '@/components/PageContent.vue'
import StatRow from '@/components/StatRow.vue'
import { ApiRequest } from '@/config'
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const delivery = ref({});
const route = useRoute();
const router = useRouter();

const getDelivery = async () => {
  try {
    const { data } = await ApiRequest.get(`deliveries/${route.params.id}`);
    if (!data.id) return router.back();
    delivery.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

onMounted(() => {
  getDelivery();
});
</script>