import { ProjectSectionKeepListDepartmentDto } from "../projectSectionDepartments/projectSectionKeepListDepartmentDto";
import { ProjectDetailDto } from "./projectDetailDto";

export interface ProjectGeneralDto{
    //projectDetailDto
    ProjectDetailDto: ProjectDetailDto
    projectSectionKeepListDepartmentDto: ProjectSectionKeepListDepartmentDto[]
}