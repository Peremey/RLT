<script setup lang="ts">
import Inventory from './components/Inventory.vue'
import personImg from "@/assets/person.png";
import Item1 from "@/assets/Item1.png";
import Item2 from "@/assets/Item2.png";
import Item3 from "@/assets/Item3.png";
import { IInventoryParameters, type IFooter, type IPerson } from './BL/types';
import { useInventories } from './store/inventories';


const person: IPerson = {
  icon: personImg,
  name: 'Артур',
  desc: `Некоторая информация о данном персонаже
  Некоторая информация о данном персонаже
  Некоторая информация о данном персонаже
  Некоторая информация о данном персонаже
  Некоторая информация о данном персонаже
  Некоторая информация о данном персонаже
  `
}
const footer: IFooter = {
  desc: "Какая-то вспомогательная необязательная информация, возможно сообщение",
  isOpen: true
}

const iparams = new IInventoryParameters()
const { initInventories } = useInventories()
const items = new Map()
items.set(1, {
  icon: Item1,
  count: 4,
  name: "Item1",
  desc: "Описание Item1"
})

items.set(2, {
  icon: Item2,
  count: 2,
  name: "Item2",
  desc: "Описание Item2"
})


items.set(3, {
  icon: Item3,
  count: 1,
  name: "Item3",
  desc: "Описание Item3"
})

initInventories("", items)
</script>

<template>
  <Inventory :person="person" :footer="footer" :parameters="iparams" />
</template>
