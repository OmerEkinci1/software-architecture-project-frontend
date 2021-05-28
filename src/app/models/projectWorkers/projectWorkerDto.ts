import { OnInit } from "@angular/core"

export class ProjectWorkerDto implements OnInit{   
    ProjectWorkerID:number
    WorkerID:number
    WorkerName:string
    WorkerSurname:string
    ProjectSectionDepartmentID:number
    Status:boolean

    constructor(params){
        Object.assign(this,{params})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.")
    }
}