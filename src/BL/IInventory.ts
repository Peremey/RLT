
export class IInventory {
    id: string
    items: Map<number, IItem>

    constructor(items: Map<number, IItem>, id: string = "") {
        this.id = id
        this.items = items
    }

    toJSON() {
        return {
            id: this.id,
            items: Array.from(this.items.entries())
        };
    }

    hasItem(numb: number) {
        return this.items.has(numb)
    }

    getItem(numb: number) {
        return this.items.get(numb)
    }

    deleteItem(numb: number) {
        this.items.delete(numb)
    }

    changeCountItem(numb: number, count: number) {
        const item = this.items.get(numb)
        item!.count += count
        if (item!.count == 0) {
            this.deleteItem(numb)
        }
    }

    setMoveItem(numb: number, new_numb: number) {
        const item = this.items.get(numb)
        if (item == undefined) {
            throw new Error(`undefined item ${numb}`)
        }
        let newItem = this.items.get(new_numb)
        let temp_item = null
        if (newItem != undefined) {
            temp_item = {
                ...newItem
            }
        }
        this.items.set(new_numb, item)

        if (temp_item != null) {
            this.items.set(numb, temp_item)
        } else {
            this.deleteItem(numb)
        }
    }
}

export interface IItem {
    icon: string
    count: number
    name: string
    desc: string
}