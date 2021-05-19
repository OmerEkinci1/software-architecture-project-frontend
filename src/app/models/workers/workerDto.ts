import { DepartmentType } from "../departmentTypes/departmentType";

export interface WorkerDto{
    WorkerID:number
    WorkerName:string
    WorkerSurname:string
    DailyWorkingTime:number
    HourSalary:number
    StartTime:Date
    Status:boolean
    departmentType: DepartmentType[]
}