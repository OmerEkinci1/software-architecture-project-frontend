import { OnInit } from "@angular/core";
import { ProjectSectionCreationDto } from "../projectSections/projectSectionCreationDto";

export class ProjectCreationDto implements OnInit{
    //project
    UserID:number
    ProjectName:string
    Subject:string
    ProjectBudget:number
    MinWorkerCount:number
    MaxWorkerCount:number
    TotalDeclaredTime:number
    // project section
    ProjectSections : ProjectSectionCreationDto[]

    constructor(UserID:number,ProjectName:string,Subject:string,
        ProjectBudget:number,MinWorkerCount:number,MaxWorkerCount:number,
        TotalDeclaredTime:number,ProjectSections : ProjectSectionCreationDto[]){
        Object.assign(this,{UserID,ProjectName,Subject,ProjectBudget,MinWorkerCount,
            MaxWorkerCount,TotalDeclaredTime,ProjectSections})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}