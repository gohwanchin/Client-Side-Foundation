export type OrderDB = {
    [key: string]: Order
}

export const ordersDB: OrderDB = {}

export interface Order{
    uuid: string
    name: string
    mobile: number
    items: Array<Item>
}

export interface Item{
    item: string
    quantity: number
}