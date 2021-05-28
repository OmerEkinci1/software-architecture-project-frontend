import { OnInit } from "@angular/core";

export class UserOperationClaim implements OnInit{   
    UserOperationClaimID:number;
    UserID:number;
    OperationClaimID:number;

    constructor(UserID:number,OperationClaimID:number){
        Object.assign(this,{UserID,OperationClaimID})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}