import { DepartmentType } from "../departmentTypes/departmentType";

export class WorkerCreationDto{
    WorkerName:string
    WorkerSurname:string
    DailyWorkingTime:string
    HourSalary:number
    UserID:number
    DepartmentTypes: DepartmentType[]
}