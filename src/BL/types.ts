export interface IPerson {
    icon: string
    name: string
    desc: string
}

export interface IFooter {
    desc: string
    isOpen: boolean
}

export class IInventoryParameters {
    countX: number
    countY: number
    id: string
    constructor(countX = 5, countY = 5, id = "") {
        this.countX = countX
        this.countY = countY
        this.id = id
    }
    count() {
        return this.countX * this.countY
    }

}
