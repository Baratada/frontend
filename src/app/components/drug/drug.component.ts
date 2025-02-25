import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrugService } from '../../services/drugSerivce/drugs.service';
import { Drug } from '../../models/user.model';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../../services/userService/user.service';



@Component({
  selector: 'app-drug',
  imports: [CommonModule, FormsModule],
  templateUrl: './drug.component.html',
  styleUrl: './drug.component.scss'
})
export class DrugComponent {
  drug: Drug | null = null;
  amount: number = 0;
  user$!: Observable<User>;

  constructor(private route: ActivatedRoute, private drugService: DrugService, private userService: UserService) {
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

  ngOnInit() {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      this.user$ = this.userService.getUserById(userId);  // Assign Observable<User> to user$
    } else {
      console.error("User ID not found in local storage");
    }
  }

  order() {
    this.drugService.updateDrugStock(String(this.drug!.id), this.amount).subscribe(response => {
        console.log("Stock update response:", response);
        this.drug!.stock += this.amount;
    }, error => {
        console.error("Error updating stock:", error);
    });
  }
}
