import { OnInit } from "@angular/core"

export class WorkerSalaryExperienceDto  implements OnInit {

    WorkerSalaryExperienceID:number
    DepartmentTypeID:number
    DepartmentTypeName:string
    Year:number
    minHourSalary:number
    maxHourSalary:number

    constructor(WorkerSalaryExperienceID,DepartmentTypeID:number,Year:number,minHourSalary:number,maxHourSalary:number){
        Object.assign(this,{WorkerSalaryExperienceID,DepartmentTypeID,Year,minHourSalary,maxHourSalary})

    }
    ngOnInit(): void {
        throw new Error("Method not implemented.")
    }
    
}