import { EntitySchema } from "typeorm";

const editor = new EntitySchema({
    name: "Editor",
    tableName: "editor",
    columns: {
        id: {primary: true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 50, nullable: false},
        cnpj: {type: "varchar", length: 50, nullable: false},
        email: {type: "varchar", length: 50, nullable: false},
        createdAt: {type: "datetime", nullable: false, default: () => "CURRENT_TIMESTAMP"},
        deletedAt: {type: "datetime", nullable: true}
    }
});

export default editor;