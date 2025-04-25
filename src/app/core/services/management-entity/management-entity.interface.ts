

export const ManagementEntityTypes = {
    ENTITY_SUPERIOR: 'ENTITY_SUPERIOR',
    COMPANY: 'COMPANY',
    BROKER: 'POINT_OF_SALE'
}

export class ManagementEntity {

    uuid: string;
    name: string;
    email: string;
    phone: string;
    type: "ENTITY_SUPERIOR" | "COMPANY" | "POINT_OF_SALE";

    constructor(entity: any) {
        this.uuid = entity.id;
        this.name = entity.name;
        this.type = entity.type;
        this.email = entity.email;
        this.phone = entity.phone;
    }

}