import { OnInit } from "@angular/core";
import { ProjectDetailDto } from "./projectDetailDto";

export class Project implements OnInit{
    ProjectID:number;
    UserID:number;
    ProjectName:string;
    Subject:string;
    ProjectBudget:number;
    MinWorkerCount:number;
    MaxWorkerCount:number;
    ActiveWorkerCount:number;
    TotalDeclaredTime:number;
    RemainingProjectTime:number;
    Status:boolean;

    constructor(projectDetailDto:ProjectDetailDto){
        Object.assign(this,{projectDetailDto})
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}