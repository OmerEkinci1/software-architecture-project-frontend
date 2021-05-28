import { OnInit } from "@angular/core";

export class OperationClaim implements OnInit{   
    OperationClaimID:number;
    OperationClaimName:string;

    constructor(params:OperationClaim){
        Object.assign(this,params)

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}