import { OnInit } from "@angular/core";

export class UserOperationClaim implements OnInit{   
    UserOperationClaimID:number;
    UserID:number;
    OperationClaimID:number;

    constructor(UserOperationClaimID:number,UserID:number,OperationClaimID:number){
        Object.assign(this,{UserOperationClaimID,UserID,OperationClaimID})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}