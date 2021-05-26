import { ProjectSectionKeepListDepartmentDto } from "../projectSectionDepartments/projectSectionKeepListDepartmentDto";
import { ProjectDetailDto } from "./projectDetailDto";

export interface ProjectGeneralDto{
    ProjectDetailDto: ProjectDetailDto
    projectSectionKeepListDepartmentDto: ProjectSectionKeepListDepartmentDto[]
}