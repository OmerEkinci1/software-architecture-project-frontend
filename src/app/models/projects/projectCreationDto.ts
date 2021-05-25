export interface ProjectCreationDto{
    //project
    UserID:number
    ProjectName:string
    Subject:string
    ProjectBudget:number
    MinWorkerCount:number
    MaxWorkerCount:number
    TotalDeclaredTime:number
    // project section
    ProjectSectionTime:string
    SectionProjectTime:number
    //project section department
    ProjectSectionDepartmentID:number
    ProjectSectionID:number
    DepartmentTypeID:number
    Status:boolean

}