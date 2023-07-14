import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { User } from '../../../core/interfaces/user';

@Component({
  selector: 'app-custom-select-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-select-page.component.html',
  styleUrls: [
    '../../common-page.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectPageComponent implements OnInit {

  users: User[] = [
    new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
    new User(2, 'Niels Bohr', 'niels', 'Denmark'),
    new User(3, 'Marie Curie', 'marie', 'Poland/French'),
    new User(4, 'Isaac Newton', 'isaac', 'United Kingdom'),
    new User(5, 'Stephen Hawking', 'stephen', 'United Kingdom', true),
    new User(6, 'Max Planck', 'max', 'Germany'),
    new User(7, 'James Clerk Maxwell', 'james', 'United Kingdom'),
    new User(8, 'Michael Faraday', 'michael', 'United Kingdom'),
    new User(9, 'Richard Feynman', 'richard', 'USA'),
    new User(10, 'Ernest Rutherford', 'ernest', 'New Zealand'),
  ];
  filteredUsers = this.users;


  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
}
