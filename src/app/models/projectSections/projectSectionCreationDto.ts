import { OnInit } from "@angular/core";
import { ProjectSectionDepartment } from "../projectSectionDepartments/projectSectionDepartment";

export class ProjectSectionCreationDto implements OnInit{
    ProjectSectionName:string
    SectionProjectTime:number
    ProjectSectionDepartment:ProjectSectionDepartment[]

    constructor(ProjectSectionName:string,SectionProjectTime:number,ProjectSectionDepartment:ProjectSectionDepartment[]){
        Object.assign(this,{ProjectSectionName,SectionProjectTime,ProjectSectionDepartment})
    }

    // constructor(public ProjectSectionName:string,public SectionProjectTime:number,public ProjectSectionDepartment:ProjectSectionDepartment[]){

    // }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}