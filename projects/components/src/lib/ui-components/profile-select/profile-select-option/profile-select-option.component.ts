import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { User } from "../../../interfaces/user.interface";
import { Highlightable } from "@angular/cdk/a11y";


@Component({
  selector: 'app-profile-select-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-select-option.component.html',
  styleUrls: ['./profile-select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOptionComponent implements Highlightable, OnChanges {

  @Input() user: User | undefined;

  @Input() @HostBinding('class.disabled') disabled = false;

  @Output() selected = new EventEmitter<ProfileOptionComponent>();

  @HostBinding('class.selected') protected isSelected = false;

  @HostBinding('class.active') protected isActive = false;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private el: ElementRef<HTMLElement>
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.isActive = !!this.user?.selected;
  }

  setActiveStyles(): void {
    this.isActive = true;
    this.cd.markForCheck();
  }

  setInactiveStyles(): void {
    this.isActive = false;
    this.cd.markForCheck();
  }

  @HostListener('click')
  protected select() {
    if (!this.disabled) {
      this.highlightAsSelected();
      this.selected.emit(this);
    }
  }

  deselect() {
    this.isSelected = false;
    this.cd.markForCheck();
  }

  highlightAsSelected() {
    this.isSelected = true;
    this.cd.markForCheck();
  }

  scrollIntoView(options?: ScrollIntoViewOptions) {
    this.el.nativeElement.scrollIntoView(options);
  }
}
