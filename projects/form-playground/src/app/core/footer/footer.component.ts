import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FooterComponent {

  get year(): number {
    return (new Date())?.getFullYear();
  }
}
