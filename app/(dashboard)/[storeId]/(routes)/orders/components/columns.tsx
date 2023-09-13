"use client"

import { ColumnDef } from "@tanstack/react-table"
/* import CellAction from "./cellAction" */


export type OrderColumn = {
  id: string
  phone: String,
  address: String,
  isPaid: Boolean,
  totalPrice: String,
  products: String,

  createdAt: string

}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

]
