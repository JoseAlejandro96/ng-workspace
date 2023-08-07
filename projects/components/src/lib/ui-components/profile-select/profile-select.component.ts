import {
  AnimationEvent,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { Component, HostBinding, HostListener } from "@angular/core";
import { User } from "../../interfaces/user.interface";
import { ProfileOptionComponent } from "./profile-select-option/profile-select-option.component";

@Component({
  selector: 'app-profile-selector',
  imports: [CommonModule, OverlayModule, ProfileOptionComponent],
  standalone: true,
  templateUrl: './profile-select.component.html',
  styleUrls: ['./profile-select.component.scss'],
  animations: [
    trigger('dropDown', [
      state('void', style({ transform: 'scaleY(0)', opacity: 0 })),
      state('*', style({ transform: 'scaleY(1)', opacity: 1 })),
      transition(':enter', [animate('320ms cubic-bezier(0, 1, 0.45, 1.34)')]),
      transition(':leave', [
        animate('420ms cubic-bezier(0.88, -0.7, 0.86, 0.85)'),
      ]),
    ]),

    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
})
export class ProfileSelectComponent {

  animate = 'in'

  /**
   * Permite saber si esta abierto el select
   */
  @HostBinding('class.select-panel-open') isOpen = false;

  /**
   * Abre el select
   */
  @HostListener('click') open() {
    // if (this.disabled) return;
    this.isOpen = true;
    // if (this.searchable) {
    //   setTimeout(() => {
    //     this.searchInputEl.nativeElement.focus()
    //   }, 0);
    // }
    // this.cd.markForCheck();
  }


  usersMocks: User[] = [
    {
      id: 1,
      name: 'Nathashia Selected',
      email: 'nathashiabunny@mail.com',
      imageUrl: 'https://s2.r29static.com/bin/entry/25f/720x864,85/2088770/image.webp',
    },
    {
      id: 2,
      name: 'Nathashia Bunny',
      email: 'nathashiabunny@mail.com',
      imageUrl: 'https://w0.peakpx.com/wallpaper/476/419/HD-wallpaper-pretty-girl-face-wind-city-ultra-girls-girl-style-beautiful-portrait-woman-design-human-background-young-wind-face-female-urban-beauty-model-fashion-look-pretty-vogue-person-redlips-thumbnail.jpg',
    },
    {
      id: 3,
      name: 'Nathashia Bunny',
      email: 'nathashiabunny@mail.com',
      imageUrl: 'https://image.winudf.com/v2/image1/bXlzdGF0dXNhcHAuYnVudHlmcm9tYmVuZ2FsLmluZGlhbl9jdXRlYmFiZXNfc2NyZWVuXzVfMTYwNTY2NTU1OF8wMTQ/screen-5.webp?fakeurl=1&type=.webp',
      selected: true
    },
    {
      id: 4,
      name: 'Nathashia Bunny',
      email: 'nathashiabunny@mail.com',
      imageUrl: 'https://i.pinimg.com/474x/d4/50/fc/d450fc4e5255cea6e8dd2abc96cd8633.jpg',
    },
    {
      id: 5,
      name: 'Nathashia Bunny',
      email: 'nathashiabunny@mail.com',
      imageUrl: 'https://cdn.pixabay.com/photo/2021/06/04/11/24/woman-6309565_960_720.jpg',
    }
  ];


  get selectedUser(): User | undefined {
    return this.usersMocks.find((user) => user.selected);
  }

  /**
   * Cierra el select
   */
  close() {
    this.isOpen = false;
  }

  /**
   * Se encarga de emitir los eventos cuando se abre y
   * cuando se cierra el componente select
   * @param param0 evento animacion que emite la animacion cuando acaba
   */
  protected onPanelAnimationDone({ fromState, toState }: AnimationEvent) {

  }

  onOptionSelected(event: ProfileOptionComponent) {
    this.usersMocks = this.usersMocks.map((user) => ({ ...user, selected: user.id === event.user?.id }))
    this.close()
    this.animate = 'in'
  }


  onAnimationSlideDone({ fromState, toState }: AnimationEvent) {
    console.log(fromState);
    console.log(toState);

  }
}
