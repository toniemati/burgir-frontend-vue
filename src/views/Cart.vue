<template>
  <Page>
    <Header1>Cart</Header1>

    <SubHeader>Your products</SubHeader>

    <template v-if="cart.products.length > 0 && products.length">
      <button v-if="cart.products.length >= 1" @click="setModalVisible" class="cart__zamowButton">
        Pay and order
      </button>

      <div class="cart__content">
        <CartProduct v-for="product in cart.products" :key="product.product_id" :productId="product.product_id"
          :quantity="product.quantity" :products="products" />
      </div>
    </template>

    <template v-else>
      <router-link :to="{ name: 'menu' }" class="cart__menuLink">
        If you want to eat something, add it to your basket first :)
      </router-link>
    </template>
  </Page>

  <div v-if="showModal" class="modal">
    <div class="modal__buttons">
      <div class="buttons__item" v-if="option.length" @click="option = ''">⏪</div>

      <div class="buttons__item" @click="showModal = false; option = ''">❌</div>
    </div>

    <div class="modal__content">
      <div v-if="!option.length" class="modal__options">
        <button @click="option = 'log'">Login</button>

        <button @click="option = 'reg'">Register</button>
      </div>

      <form v-else-if="option === 'log'" class="modal__register" @submit="handleLogin">
        <div class="register__group">
          <input type="text" placeholder="Login" />
          <input type="password" placeholder="Password" />
        </div>

        <button type="submit">Login and order</button>
      </form>

      <form v-else-if="option === 'reg'" class="modal__register" @submit="handleFormSubmit">
        <div class="register__group">
          <input type="text" placeholder="Login" />
          <input type="password" placeholder="Password" />
        </div>

        <div class="register__group">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Lastname" />
        </div>

        <div class="register__group">
          <input type="text" placeholder="Country" />
          <input type="text" placeholder="City" />
        </div>

        <div class="register__group">
          <input type="text" placeholder="Street" />
          <input type="text" placeholder="House number" />
        </div>

        <div class="register__group">
          <input type="text" placeholder="Phone" />
          <input type="text" placeholder="E-mail" />
        </div>

        <button type="submit">Register and order</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import CartProduct from '@/components/CartProduct.vue'
import Header1 from '@/components/Header1.vue'
import Page from '@/components/Page.vue'
import SubHeader from '@/components/SubHeader.vue'
import { ApiRequest } from "@/config"
import { computed, onMounted, ref } from "vue"
import { useStore } from "vuex"

const store = useStore();
const cart = computed(() => store.getters.getCart);
const products = ref([]);
const customers = ref([]);
const showModal = ref(false);
const option = ref("");

const setModalVisible = () => {
  showModal.value = true;
};

const setModalHidden = () => {
  showModal.value = false;
};

const order = (customerId) => {
  store.dispatch("setCustomer", customerId);
  store.dispatch("order");

  setModalHidden()
};

const handleLogin = async (e) => {
  e.preventDefault();

  const data = {
    login: e.target[0].value,
    password: e.target[1].value
  }

  const ok = Object.values(data).every(value => value);

  if (!ok) return alert('Fill every input!');

  try {
    const response = await ApiRequest.post('customers/login', data);

    e.target.reset();

    if (response.data.success) {
      order(response.data.customerId);
      option.value = "";
    } else {
      alert('Wrong credentials');
    }
  } catch (error) {
    console.error(error)
    alert(error.response.data.message);
  }
}

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const data = {
    login: e.target[0].value,
    password: e.target[1].value,
    first_name: e.target[2].value,
    last_name: e.target[3].value,
    country: e.target[4].value,
    city: e.target[5].value,
    street: e.target[6].value,
    house_number: e.target[7].value,
    telephone: e.target[8].value,
    email: e.target[9].value,
  };

  const ok = Object.values(data).every(value => value);

  if (!ok) return alert('Fill every input!');

  try {
    const response = await ApiRequest.post('customers/register', data);

    e.target.reset();

    if (response.data.id) {
      order(response.data.id);
      option.value = "";
    } else {
      alert("Something goes wrong, try again later");
    }
  } catch (error) {
    console.error(error)
    alert("Something goes wrong, try again later");
  }
};

const getProducts = async () => {
  try {
    const { data } = await ApiRequest.get('products');
    products.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

const getCustomers = async () => {
  try {
    const { data } = await ApiRequest.get('customers');
    customers.value = data;
  } catch (error) {
    console.error(error)
    alert(error.message)
  }
};

onMounted(() => {
  getProducts();
  getCustomers();
});
</script>

<style scoped>
.cart__zamowButton {
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 16px;
  color: #f59705;
  background: #eee;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

@media only screen and (min-width: 480px) {
  .cart__zamowButton {
    width: 300px;
    margin: 0 auto;
  }
}

.cart__zamowButton:hover {
  color: #eee;
  background: #f59705;
}

.cart__menuLink {
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
  color: #117098;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}

.cart__menuLink:hover {
  filter: brightness(1.5);
}

.cart__content {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #000000aa;
  display: flex;
  justify-content: center;
}

.modal__buttons {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-evenly;
  font-size: 32px;
  width: 100%;
}

.buttons__item {
  cursor: pointer;
}

.modal__content {
  padding: 0 5px;
  width: 100%;
  height: max-content;
  margin-top: 10%;
}

@media only screen and (min-width: 768px) {
  .modal__content {
    max-width: 1000px;
    padding: 0 20px;
  }
}

.modal__options {
  display: flex;
  justify-content: center;
  column-gap: 20px;
}

.modal__options button {
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  background: #f59705;
  opacity: 1;
  color: #eee;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.modal__options button:hover {
  background: #eee;
  color: #f59705;
}

.modal__login {
  display: flex;
  justify-content: center;
}

.modal__register {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.register__group {
  display: flex;
  row-gap: 10px;
  flex-direction: column;
}

@media only screen and (min-width: 768px) {
  .register__group {
    flex-direction: row;
    justify-content: center;
    column-gap: 10px;
  }
}

.modal__register input {
  width: 100%;
  font-family: Lato;
  outline: none;
  background: black;
  border: 1px solid #f59705;
  border-radius: 5px;
  padding: 10px 15px;
  color: #eee;
  font-size: 16px;
}

.modal__register input::placeholder {
  font-family: Lato;
  color: #eee;
  opacity: 0.85;
}

.modal__register button {
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  background: #f59705;
  opacity: 1;
  color: #eee;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

@media only screen and (min-width: 768px) {
  .modal__register button {
    width: 300px;
    margin: 0 auto;
  }
}

.modal__register button:hover {
  background: #eee;
  color: #f59705;
}
</style>
