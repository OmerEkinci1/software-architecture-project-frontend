export interface Project{
    ProjectID:number;
    UserID:number;
    ProjectName:string;
    Subject:string;
    ProjectBudget:number;
    MinWorkerCount:number;
    MaxWorkerCount:number;
    ActiveWorkerCount:number;
    TotalDeclaredTime:number;
    RemainingProjectTime:number;
    Status:boolean;
}