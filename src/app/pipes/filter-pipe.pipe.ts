import { Pipe, PipeTransform } from '@angular/core';
import { Compensation } from '../models/compensations/compensation';
import { WorkerCompensationDto } from '../models/compensations/workerCompensationDto';
import { Worker } from '../models/workers/worker';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: WorkerCompensationDto[], filterText: string): WorkerCompensationDto[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((w:WorkerCompensationDto)=>w.WorkerName.toLocaleLowerCase().indexOf(filterText) !== -1)
    :value;
  }

}
