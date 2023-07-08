import { waitForAsync } from '@angular/core/testing';
import { UniqueNicknameDirective } from './unique-nickname.directive';
import { AbstractControl } from '@angular/forms';


describe('UniqueNicknameDirective', () => {

  let directive: UniqueNicknameDirective;

  beforeEach(waitForAsync(() => {
    directive = new UniqueNicknameDirective();
  }));

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('Should Validate Control with used nickname', () => {

    const control: AbstractControl<string> = {
      value: 'josh'
    } as AbstractControl<string>;

    const result = directive.validate(control);
    result.subscribe((value) => {
      expect(value).toEqual({ appUniqueNickname: { isTaken: true } });
    })
  })

  it('Should Validate Control with free nickname', () => {

    const control: AbstractControl<string> = {
      value: 'anamaria'
    } as AbstractControl<string>;

    const result = directive.validate(control);
    result.subscribe((value) => {
      expect(value).toBeNull();
    })
  })
});
