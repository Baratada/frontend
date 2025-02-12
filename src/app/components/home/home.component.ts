import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule
@Component({
  selector: 'app-home',
  standalone: true,  // Mark as standalone
  imports: [RouterModule],  // Add RouterModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
