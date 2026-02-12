<template>
    <div class="stat">
        <span>{{ props.name }}: </span>
        <span v-if="props.value" class="stat__value">{{ props.value }}</span>
        <span v-else class="stat__value">
            <slot />
        </span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    name: String,
    value: String
})
</script>

<style>
.stat {
    font-size: 16px;
}

.stat__value {
    font-weight: bold;
    font-size: 18px;
    color: #f59705;
}

.stat__value a {
    color: #f59705;
    text-decoration: none;
}
</style>