import { OnInit } from "@angular/core";

export class ProjectSection implements OnInit{
    ProjectSectionID:number;
    ProjectID:number;
    ProjectSectionName:string;
    SectionProjectTime:number;
    RemainingProjectTime:number;
    WorkerCount:number;
    Status:boolean;

    constructor(params){
        Object.assign(this,{params})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}