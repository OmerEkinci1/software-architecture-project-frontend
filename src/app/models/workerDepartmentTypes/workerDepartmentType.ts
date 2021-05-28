import { OnInit } from "@angular/core";

export class WorkerDepartmentType implements OnInit{   
    WorkerID:number;
    DepartmentTypeID:number;

    constructor(WorkerID:number,DepartmentTypeID:number){
        Object.assign(this,{DepartmentTypeID,WorkerID})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}