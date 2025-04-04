<template>
    <div class="footer" v-if="isOpen">
        <BtnClose @close="closeFooter" />
        <div class="footer--wrapper">
            <div class="footer--content">{{ data.desc }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BtnClose from './BtnClose.vue';
import type { IFooter } from '@/BL/types';
import { ref } from 'vue';

const props = defineProps<{
    data: IFooter
}>()

const isOpen = ref(props.data.isOpen)
const closeFooter = () => {
    isOpen.value = false
}
</script>