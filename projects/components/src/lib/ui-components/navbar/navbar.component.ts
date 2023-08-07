import { Component } from "@angular/core";
import { ProfileSelectComponent } from "../profile-select/profile-select.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ProfileSelectComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent { }
