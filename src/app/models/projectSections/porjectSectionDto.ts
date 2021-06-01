import { OnInit } from "@angular/core";

export class ProjectSectionDto implements OnInit{
    ProjectSectionID:number;
    ProjectID:number;
    ProjectName:string;
    ProjectSectionName:string;
    SectionProjectTime:number;
    RemainingProjectTime:number;
    WorkerCount:number;
    Status:boolean;

    constructor(projectSection: ProjectSectionDto){
        Object.assign(this,{projectSection})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}