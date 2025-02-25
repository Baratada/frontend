import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Drug, User } from '../../models/user.model';
import { DrugService } from '../../services/drugSerivce/drugs.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-drugs',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss']
})
export class DrugsComponent {
  drugs$!: Observable<Drug[]>; // Observable holding the list of drugs
  user$!: Observable<User>; // Observable holding the current user
  searchTerm: string = ''; // Search term bound to the input field
  userRole: string = ''; // Variable to store user role

  constructor(private drugService: DrugService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadDrugs();
    this.loadUser();
  }

  // Load the drugs from the service
  loadDrugs(): void {
    this.drugs$ = this.drugService.getDrugs();
  }

  // Load the user from the service
  loadUser(): void {
    this.userService.getUserById(localStorage.getItem('user_id')!).subscribe(user => {
      this.userRole = user.role; // Store the role for checking in the HTML
    });
  }

  // Search functionality - refetch drugs based on search term
  searchDrugs(): void {
    if (this.searchTerm) {
      this.drugs$ = this.drugService.getDrugs(this.searchTerm);
    } else {
      this.loadDrugs(); // Reload all drugs if the search term is empty
    }
  }

  addDrug(): void {
    const name = prompt("Enter drug name:");
    if (!name) return alert("Drug name is required.");
  
    const prescriptionInput = prompt("Is this a prescription drug? (yes/no):");
    const prescription = prescriptionInput?.toLowerCase() === 'yes';
  
    const stockInput = prompt("Enter stock quantity:");
    const stock = parseInt(stockInput || '0', 10);
    if (isNaN(stock) || stock < 0) return alert("Invalid stock quantity.");
  
    const info = prompt("Enter drug information:", "Speak to your doctor before use of drug.") || "Speak to your doctor before use of drug.";
  
    const priceInput = prompt("Enter drug price:");
    const price = parseFloat(priceInput || '0');
    if (isNaN(price) || price <= 0) return alert("Invalid price.");
  
    // Create a new drug object (ID is optional)
    const newDrug: Drug = { name, prescription, stock, info, price };
  
    // Send the drug data to the backend
    this.drugService.addDrug(newDrug).subscribe(() => {
      this.loadDrugs(); // Refresh the list after adding
    });
  }
  
  

  deleteDrug(drugId: number): void {
    this.drugService.deleteDrug(String(drugId)).subscribe(() => {
      this.loadDrugs(); // Reload the drug list after deleting a drug
    });
  }
}
