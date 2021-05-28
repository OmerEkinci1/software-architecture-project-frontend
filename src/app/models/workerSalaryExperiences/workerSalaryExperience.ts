import { OnInit } from "@angular/core";

export class WorkerSalaryExperience implements OnInit{
    WorkerSalaryExperienceID:number;
    DepartmentTypeID:number;
    Year:number;
    minHourSalary:number;
    maxHourSalary:number;

    constructor(DepartmentTypeID:number,Year:number,minHourSalary:number,maxHourSalary:number){
        Object.assign(this,{DepartmentTypeID,Year,minHourSalary,maxHourSalary})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}