import { Permission } from "./permissions.model";


export const PERMISSIONS: Permission[] = [
    {
        id: "C1",
        name: "Create",
        entity: "Order",
        description: "Create Order"
    },
    {
        id: "U1",
        name: "Update",
        entity: "Order",
        description: "Update Order"
    },
    {
        id: "V1",
        name: "View",
        entity: "Order",
        description: "View Order"
    },
    {
        id: "D1",
        name: "Delete",
        entity: "Order",
        description: "Delete Order"
    },
    {
        id: "V2",
        name: "View",
        entity: "Product",
        description: "View Product"
    },
    {
        id: "C2",
        name: "Create",
        entity: "Product",
        description: "Create Product"
    },
    {
        id: "U2",
        name: "Update",
        entity: "Product",
        description: "Update Product"
    },
    {
        id: "D2",
        name: "Delete",
        entity: "Product",
        description: "Delete Product"
    },
    {
        id: "V3",
        name: "View",
        entity: "Category",
        description: "View Category"
    },
    {
        id: "D3",
        name: "Delete",
        entity: "Category",
        description: "Delete Category"
    },
    {
        id: "C3",
        name: "Create",
        entity: "Category",
        description: "Create Category"
    },
    {
        id: "U3",
        name: "Update",
        entity: "Category",
        description: "Update Category"
    },
    {
        id: "V4",
        name: "View",
        entity: "Invoice",
        description: "View Invoice"
    },
    {
        id: "C4",
        name: "Create",
        entity: "Invoice",
        description: "Create Invoice"
    },
    {
        id: "U4",
        name: "Update",
        entity: "Invoice",
        description: "Update Invoice"
    },
    {
        id: "D4",
        name: "Delete",
        entity: "Invoice",
        description: "Delete Invoice"
    },
    {
        id: "V6",
        name: "View",
        entity: "Role",
        description: "View Role"
    },
    {
        id: "C6",
        name: "Create",
        entity: "Role",
        description: "Create Role"
    },
    {
        id: "U6",
        name: "Update",
        entity: "Role",
        description: "Update Role"
    },
    {
        id: "D6",
        name: "Delete",
        entity: "Role",
        description: "Delete Role"
    },
    {
        id: "V7",
        name: "View",
        entity: "Permission",
        description: "View Permission"
    },
    {
        id: "C7",
        name: "Create",
        entity: "Permission",
        description: "Create Permission"
    }
]