<template>
    <div class="deleteItem">
        <BtnClose @click="emit('cancel')" />
        <img class="deleteItem--image" :src="item.icon" />
        <div class="deleteItem--name">{{ item.name }}</div>
        <div class="deleteItem--desc">{{ item.desc }}</div>
        <div class="deleteItem--btns btn">
            <div class="btn--wrapper" v-if="isView1">
                <button type="button" class="btn--delete" @click="deleteItemStart">Удалить предмет</button>
            </div>
            <form class="btn--wrapper deleteItem--form" @submit.prevent="emit('submit', -1 * Number(count))" v-else>
                <input type="text" class="deleteItem--count" v-model="count" @input="onInput" required
                    placeholder="Введите количество" />
                <button type="button" class="btn--cancel" @click="emit('cancel')">Отмена</button>
                <button type="submit" class="btn--apply">Подтвердить</button>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IItem } from "@/BL/IInventory";
import BtnClose from "./BtnClose.vue"
import { ref } from "vue";
const props = defineProps<{
    item: IItem
}>()
const emit = defineEmits<{
    (e: "cancel"): void,
    (e: "submit", count: number): void
}>()

const isView1 = ref(true)

const deleteItemStart = () => {
    isView1.value = false
}

const count = ref<number | "">()

const onInput = (e: Event) => {
    const input = e.target as HTMLInputElement
    if (input.value == "")
        return
    const numVal = parseInt(input.value.replace(/\D/g, ''))

    if (numVal >= 0 && numVal <= props.item.count) {
        count.value = numVal
        return
    }
    count.value = props.item.count
}
</script>