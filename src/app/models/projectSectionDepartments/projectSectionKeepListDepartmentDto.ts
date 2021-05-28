import { OnInit } from "@angular/core";
import { ProjectSection } from "../projectSections/projectSection";
import { ProjectSectionDepartmentDto } from "./projectSectionDepartmentDto";

export class ProjectSectionKeepListDepartmentDto implements OnInit {
    projectSection: ProjectSection
    projectSectionDepartmentDto: ProjectSectionDepartmentDto

    constructor(params){
        Object.assign(this,{params})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}