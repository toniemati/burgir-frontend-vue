<template>
    <div class="page">
        <slot />
    </div>
</template>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

@media only screen and (min-width: 768px) {
    .page {
        padding: 0 20px;
    }
}
</style>