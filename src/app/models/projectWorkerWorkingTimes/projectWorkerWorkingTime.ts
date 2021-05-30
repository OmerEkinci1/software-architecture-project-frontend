import { OnInit } from "@angular/core";

export class ProjectWorkerWorkingTime implements OnInit{  
    ProjectWorkerWorkingTimeID:number;
    ProjectWorkerID:number;
    DailyStartHour:string;
    DailyFinishHour:string;
    Date:Date;

    constructor(ProjectWorkerWorkingTimeID,ProjectWorkerID:number,DailyStartHour:string,DailyFinishHour:string,Date:Date){
        Object.assign(this, {ProjectWorkerWorkingTimeID,ProjectWorkerID,DailyStartHour,DailyFinishHour,Date})
    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}