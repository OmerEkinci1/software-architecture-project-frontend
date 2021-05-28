import { OnInit } from "@angular/core";


export class Compensation implements OnInit {
    
    CompensationID:number;
    WorkerID:number;
    UserID:number;
    CompensationAmount:number;
    CompensationDate?:Date;

    constructor(UserID:number,WorkerID:number,CompensationAmount:number){
        Object.assign(this,{UserID,WorkerID,CompensationAmount})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}


