import { ProjectDetailDto } from "../projects/projectDetailDto";
import { ProjectSectionDepartmentDto } from "../projectSectionDepartments/projectSectionDepartmentDto";
import { ProjectSection } from "../projectSections/projectSection";
import { ProjectWorkerDto } from "./projectWorkerDto";

export interface ProjectWorkerGeneralDto{
    projectDetailDto: ProjectDetailDto
    projectSection: ProjectSection
    projectSectionDepartmentDto: ProjectSectionDepartmentDto
    projectWorkerDto: ProjectWorkerDto
}