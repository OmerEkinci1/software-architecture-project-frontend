import { OnInit } from "@angular/core";

export class Salary implements OnInit{
    SalaryID?:number;
    WorkerID?:number;
    UserID?:number;
    SalaryAmount?:number;
    SalaryDate?:Date;

    constructor(UserID:number,WorkerID:number,SalaryAmount:number){
        Object.assign(this,{UserID,WorkerID,SalaryAmount})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}