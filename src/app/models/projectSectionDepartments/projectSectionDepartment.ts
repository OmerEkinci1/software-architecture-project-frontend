import { OnInit } from "@angular/core";

export class ProjectSectionDepartment implements OnInit{
    ProjectSectionDepartmentID:number;
    ProjectSectionID:number;
    DepartmentTypeID:number;
    Status:boolean

    constructor(
        DepartmentTypeID:number){
        Object.assign(this,{
            DepartmentTypeID})

    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}