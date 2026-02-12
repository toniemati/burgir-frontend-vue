<template>
  <Page v-if="orders.length">
    <ButtonToBottom />

    <PageContent>
      <table class="content__table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Order date</th>
            <th>Customer</th>
            <th>Delivery</th>
            <th>Products</th>
            <th>Price</th>
          </tr>
        </thead>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.order_date }}</td>
          <td>
            <router-link :to="{ name: 'customerDetails', params: { id: order.customer.id } }">
              {{ order.customer.first_name }}
              {{ order.customer.last_name }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'deliveryDetails', params: { id: order.delivery.id } }">
              {{ order.delivery.id }}
            </router-link>
          </td>
          <td>
            <div v-for="product in order.products" :key="product.id">
              <router-link :to="{ name: 'productDetails', params: { id: product.id } }">
                {{ product.name }}
              </router-link>
            </div>
          </td>
          <td>
            ${{order.products.reduce((prev, curr) => prev + curr.price, 0).toFixed(2)}}
          </td>
        </tr>
      </table>

      <div class="content__summary">
        <Header2 class="summary__h2">Summary</Header2>

        <StatRow name="Number of orders" :value="orders.length" />

        <StatRow name="Number of products sold"
          :value="orders.reduce((prev, curr) => prev + curr.products.length, 0)" />

        <StatRow name="Number of customers" :value="[...new Set(orders.map((o) => o.customer.id))].length" />

        <StatRow name="Price of all orders"
          :value="'$' + orders.reduce((prev, curr) => prev + curr.products.reduce((p, c) => p + c.price, 0), 0).toFixed(2)" />
      </div>
    </PageContent>
  </Page>

  <div v-else>
    <Header2>No orders yet</Header2>
  </div>
</template>

<script setup>
import ButtonToBottom from '@/components/ButtonToBottom.vue'
import Header2 from '@/components/Header2.vue'
import Page from '@/components/Page.vue'
import StatRow from '@/components/StatRow.vue'
import { ApiRequest } from "@/config"
import { onMounted, ref } from "vue"

const orders = ref([]);

const getOrders = async () => {
  try {
    const { data } = await ApiRequest.get('orders');
    orders.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

onMounted(() => {
  getOrders();
});
</script>

<style scoped>
.content__table {
  width: 100%;
  border-collapse: collapse;
  text-align: right;
  border-radius: 5px;
  overflow: hidden;
}

.content__table th {
  background: #f59705;
  color: #1f1f1f;
}

.content__table th,
.content__table td {
  padding: 10px;
}

.content__table tr:nth-child(even) {
  background: #1f1f1f;
}

.content__table tr {
  transition: background 0.2s ease-in-out;
}

.content__table tr:hover {
  background: #2b2b2b;
}

.content__table a {
  color: #f59705;
  text-decoration: none;
  font-weight: 600;
}

.content__summary {
  font-size: 16px;
}

.summary__h2 {
  text-align: left;
  text-transform: none;
}

.summary__value {
  font-weight: bold;
  font-size: 18px;
  color: #f59705;
}
</style>