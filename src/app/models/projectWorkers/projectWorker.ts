import { OnInit } from "@angular/core";

export class ProjectWorker implements OnInit{
    ProjectWorkerID:number;
    WorkerID:number;
    ProjectSectionDepartmentID:number;
    Status:boolean;

    constructor(ProjectSectionDepartmentID:number,WorkerID:number){
        Object.assign(this,{ProjectSectionDepartmentID,WorkerID})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}