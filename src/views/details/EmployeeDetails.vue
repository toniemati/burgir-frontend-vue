<template>
  <Page v-if="employee.id">
    <Header1>Pracownik - {{ $route.params.id }}</Header1>

    <PageContent>
      <StatRow name="First name" :value="employee.first_name" />

      <StatRow name="Last name" :value="employee.last_name" />

      <StatRow name="Bussy" :value="employee.bussy ? 'tak' : 'nie'" />

      <StatRow name="Title" :value="employee.title" />

      <StatRow name="Employment date" :value="employee.hire_date" />

      <StatRow name="Salary" :value="employee.salary" />

      <StatRow name="Address" :value="employee.address" />

      <StatRow name="Total deliveries" :value="employee.deliveries?.length" />

      <StatRow name="Total delivery distance"
        :value="employee.deliveries.reduce((prev, curr) => prev + curr.distance, 0) + ' km'" />
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

const employee = ref({});
const route = useRoute();
const router = useRouter();

const getEmployee = async () => {
  try {
    const { data } = await ApiRequest.get(`employees/${route.params.id}`);
    if (!data.id) return router.back();
    employee.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

onMounted(() => {
  getEmployee();
});
</script>

<style scoped>
.employee {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

@media only screen and (min-width: 768px) {
  .employee {
    padding: 0 20px;
  }
}

.employee__header {
  text-align: center;
  text-transform: uppercase;
}

.employee__content {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.employee__stat {
  font-size: 16px;
}

.employee__value {
  font-weight: bold;
  font-size: 18px;
  color: #f59705;
}

.employee__content a {
  color: #f59705;
  text-decoration: none;
}
</style>