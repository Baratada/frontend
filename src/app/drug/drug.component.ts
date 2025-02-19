import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrugService } from '../services/drugSerivce/drugs.service';
import { Drug } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-drug',
  imports: [CommonModule, FormsModule],
  templateUrl: './drug.component.html',
  styleUrl: './drug.component.scss'
})
export class DrugComponent {
  drug: Drug | null = null;
  amount: number = 0;

  constructor(private route: ActivatedRoute, private drugService: DrugService) {
    const drugId = this.route.snapshot.paramMap.get('id') || '0';

    this.drugService.getDrugById(drugId).subscribe({
      next: (drug) => {
        this.drug = drug;
      },
      error: (err) => {
        console.error('Error fetching drug:', err);
      }
    });

  }

  order(){
    this.drugService.updateDrugStock(String(this.drug!.id), this.amount)
  }
}
