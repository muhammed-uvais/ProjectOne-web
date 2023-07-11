import { Documentmanagerchild } from "./Documentmanagerchild";


export class Documentmanagerhdr {
    Id? : number;
    AdmnDocId?: number;
    TableName!: string;
    PrimaryId?: number;
    IsActive!: number;

    DocumentmanagerChild: Documentmanagerchild = new Documentmanagerchild;
}
