import { OnInit } from "@angular/core";

export class DepartmentType implements OnInit{
    DepartmentTypeID:number;
    DepartmentTypeName:string;

    constructor(params:DepartmentType){
        Object.assign(this,params)

    }
    ngOnInit(): void {
        console.log("dededede")
    }
}
