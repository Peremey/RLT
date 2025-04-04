<template>
    <div class="inv" :style="'--items-x:' + parameters.countX + '; --items-y:' + parameters.countY + ';'"
        @dragover.prevent @touchend="breakDropTouch" @drop="breakDrop" @mouseleave="breakDrop">
        <div class="inv--left person inv--block">
            <img :src="person.icon" />
            <div class="person--name">{{ person.name }}</div>
            <div class="person--desc">{{ person.desc }}</div>
        </div>
        <div class="inv--items inv--block">
            <div class="inv--item item dragging" v-for="index of parameters.count()" :key="index"
                @dragover.prevent="onDragOver" @touchmove.prevent="onTouchMove" @touchend="onTouchEnd($event, index)"
                @drop="onDrop($event, index)">
                <template v-if="inv?.hasItem(index)">
                    <img :src="inv.getItem(index)!.icon" class="item--icon" draggable="true"
                        @dragstart="onDragStart($event, index)" @touchstart="onTouchStart($event, index)"
                        :class="{ 'dragging--moved': dragIndex == index }" @click="selectItem(index)" />

                    <div class=" item--count">
                        {{ inv.getItem(index)!.count }}
                    </div>
                </template>
            </div>
            <Transition>
                <DeleteItem :class="['inv--delete']" v-if="selectedIndex > -1" :item="inv!.getItem(selectedIndex)!"
                    @cancel="deleteItemCancel" @submit="deleteItemSubmit" />
            </Transition>
        </div>
        <Footer :class="['inv--footer', 'inv--block']" :data="footer" />
        <img class="inv--dropicon" id="inv--dropicon" />
    </div>
</template>
<script setup lang="ts">
import Footer from "./Footer.vue"
import DeleteItem from "./DeleteItem.vue"
import { useInventories } from '@/store/inventories'
import type { IFooter, IInventoryParameters, IPerson } from '@/BL/types'
import { ref } from 'vue';

const props = defineProps<{
    parameters: IInventoryParameters
    person: IPerson
    footer: IFooter
}>()

const { getInventory, saveInventories } = useInventories()
const inv = ref(getInventory(props.parameters.id))

const selectedIndex = ref(-1)
const selectItem = (index: number) => {
    selectedIndex.value = index
}
const deleteItemCancel = () => {
    selectedIndex.value = -1
}
const deleteItemSubmit = (count: number) => {
    inv.value?.changeCountItem(selectedIndex.value, count)
    saveInventories()
    selectedIndex.value = -1
}

const dragIndex = ref<number | null>(null)
const dragIcon = ref<HTMLElement>()
const parentDragIcon = ref<HTMLElement>()

const breakDrop = () => {
    clearDraggable()
}
const breakDropTouch = (event: TouchEvent) => {
    const touch = event.changedTouches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

    if (!targetElement?.closest('.inv')) {
        clearDraggable()
    }

}

const onDragStart = (event: DragEvent, index: number) => {
    if (!event.dataTransfer)
        return
    dragStart(event, index)

    const img = new Image()
    img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz4='
    event.dataTransfer.setDragImage(img, 0, 0)
    event.dataTransfer.effectAllowed = 'move'
}

const onTouchStart = (event: TouchEvent, index: number) => {
    dragStart(event, index)
}

const dragStart = (event: DragEvent | TouchEvent, index: number) => {
    dragIndex.value = index;

    const img = (event.target as HTMLElement)
    const icon = document.getElementById("inv--dropicon")! as HTMLElement
    const inv = icon.closest(".inv")! as HTMLElement
    icon.setAttribute("src", img.getAttribute("src")!)
    icon.classList.add("inv--dropicon-active")
    setDropIconPosition(event, icon, inv)

    dragIcon.value = icon
    parentDragIcon.value = inv
}

const setDropIconPosition = (event: DragEvent | TouchEvent, el: HTMLElement, parent: HTMLElement) => {
    const clientRect = parent.getBoundingClientRect()
    let X, Y;
    if ("changedTouches" in event) {
        X = event.changedTouches[0].clientX - clientRect.left
        Y = event.changedTouches[0].clientY - clientRect.top
    } else {
        X = event.clientX - clientRect.left
        Y = event.clientY - clientRect.top
    }
    el.style.left = X + "px"
    el.style.top = Y + "px"
}


const dragOver = (event: DragEvent | TouchEvent) => {
    setDropIconPosition(event, dragIcon.value!, parentDragIcon.value!)
}

const onDragOver = (event: DragEvent) => {
    dragOver(event)
}

const onTouchMove = (event: TouchEvent) => {
    dragOver(event)
};


const onDrop = (event: DragEvent, index: number) => {
    dragEnd(event, index)
}
const onTouchEnd = (event: TouchEvent, index: number) => {
    dragEnd(event, index)
}

const dragEnd = (event: DragEvent | TouchEvent, index: number) => {
    (event.target as HTMLElement).classList.remove(`selected`)
    if (dragIndex.value == undefined)
        return new Error(`dragIndex empty for ${index}`)
    inv.value!.setMoveItem(dragIndex.value, index)
    saveInventories()
    clearDraggable()
}

const clearDraggable = () => {
    if (dragIcon.value != undefined) {
        dragIcon.value.classList.remove("inv--dropicon-active")
        dragIndex.value = null
    }

}

</script>
<style lang="scss">
@import '@/assets/inv.scss';
</style>