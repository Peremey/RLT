import { type IItem, IInventory } from "@/BL/IInventory"
import { load, save } from "./storage"
import { ref } from "vue"
const inventories = ref<IInventory[]>()
// пишем хранилище с интерфейсом, схожим с pinia, чтобы в будущем легко добавить pinia, если будет нужно (например, захотим использовать ssr)
// на будущее закладываем возможность иметь отряд персонажей с индивидуальными инвентарями.

const loadInventories = () => {
    return load("inventories")
}

const saveInventories = () => {
    console.log(inventories.value)
    save("inventories", inventories.value)
}

const setInventory = (value: Map<number, IItem>, id: string = "") => {
    const inv = getInventory(id)
    inv!.items = value
}

const getInventory = (id: string = "") => {
    return inventories.value?.find(el => el.id == id)
}

const initInventories = async (id?: string, items?: Map<number, IItem>) => {
    if (inventories.value == undefined) {
        const ls = loadInventories()
        if (ls != null) {
            inventories.value = (<Array<any>>ls).map(el => new IInventory(new Map(el.items), el.id))
        } else {
            inventories.value = [new IInventory(items!, id)]
        }
    }
}

export const useInventories = () => {
    return { getInventory, setInventory, initInventories, saveInventories }
}