<template>
    <div class="btn--close" @click="emit('close')">
        <div></div>
        <div></div>
    </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
    (e: "close"): void
}>()
</script>