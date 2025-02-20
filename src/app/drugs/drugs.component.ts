import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Drug } from '../models/user.model';
import { DrugService } from '../services/drugSerivce/drugs.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-drugs',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent {
  drugs$!: Observable<Drug[]>;  // observable holding list of drugs
  searchTerm: string = ''; // search term bound to the input field

  constructor(private drugService: DrugService) {}

  ngOnInit(): void {
    // Initialize the observable with the list of drugs
    this.loadDrugs();
  }

  // Load the drugs from the service
  loadDrugs(): void {
    this.drugs$ = this.drugService.getDrugs();
  }

  // Search functionality - refetch drugs based on search term
  searchDrugs(): void {
    if (this.searchTerm) {
      this.drugs$ = this.drugService.getDrugs(this.searchTerm);
    } else {
      this.loadDrugs(); // Reload all drugs if search term is empty
    }
  }
}
