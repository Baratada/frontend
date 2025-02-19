
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Drug } from '../models/user.model';
import { DrugService } from '../services/drugSerivce/drugs.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-drugs',
  imports: [CommonModule, RouterModule],
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent {
  drugs$: Observable<Drug[]>;

  constructor(private drugService: DrugService) {
    this.drugs$ = this.drugService.getDrugs();
  }
}
