export interface User{
    UserID:number;
    DepartmentTypeID:number;
    Name:string;
    Surname:string;
    Email:string;
    PasswordSalt:Int8Array
    PasswordHash:Int8Array
    Status:boolean
}