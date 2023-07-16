import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'store-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent<T> implements Highlightable {
  @Input() value: T | null = null;

  @Input()
  @HostBinding('class.disabled')
  disabled = false;

  @Input() disabledReason = '';

  @Output() selected = new EventEmitter<OptionComponent<T>>();


  @HostBinding('class.selected')
  protected isSelected = false;

  @HostBinding('class.active')
  protected isActive = false;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private el: ElementRef<HTMLElement>
  ) { }

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
