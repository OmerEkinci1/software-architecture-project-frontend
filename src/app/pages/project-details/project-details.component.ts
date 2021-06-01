import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/projects/project';
import { ProjectDetailDto } from 'src/app/models/projects/projectDetailDto';
import { ProjectGeneralDto } from 'src/app/models/projects/projectGeneralDto';
import { ProjectSectionKeepListDepartmentDto } from 'src/app/models/projectSectionDepartments/projectSectionKeepListDepartmentDto';
import { ProjectGeneralService } from 'src/app/services/project-general.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  projectGeneralDto : ProjectGeneralDto[] = []
  projectDetailDto: ProjectDetailDto
  projectKeepListDepartmentDto:ProjectSectionKeepListDepartmentDto[]
  projects: Project[] = [];
  public id 

  constructor(private activateDdRoute: ActivatedRoute,
    private projectGeneralService: ProjectGeneralService,
    private toastrService : ToastrService,
    ) { }

  ngOnInit(): void {
    this.id = this.activateDdRoute.snapshot.paramMap.get('id')
    this.getProjectByProjectID(this.id)
    // this.activateDdRoute.queryParams.subscribe((params) => {
    //   this.getProjectByProjectID(params['projectID'])
    // })
  }

  getProjectByProjectID(ProjectID:number){
    this.projectGeneralService.getProjectByProjectID(ProjectID).subscribe(response => {
      this.projectGeneralDto = response.data,
      this.projectDetailDto=response.data["projectDetailDto"]
      this.projectKeepListDepartmentDto=response.data["projectSectionKeepListDepartments"]
      if (response.data.length == 0) {
        this.toastrService.info("There is no record for your filter.","Result of searching");
      }
    })
  }

}
