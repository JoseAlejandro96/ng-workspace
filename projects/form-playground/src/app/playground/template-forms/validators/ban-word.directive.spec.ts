import { AbstractControl } from "@angular/forms";
import { BanWordsDirective } from "./ban-word.directive";


describe('BanWordsDirective', () => {
  let directive: BanWordsDirective;

  beforeEach(() => {
    directive = new BanWordsDirective();
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should validate control with banned word', () => {
    directive.appBanWords = 'banned';

    const control: AbstractControl<string> = {
      value: 'banned',
    } as AbstractControl<string>;

    const result = directive.validate(control);

    expect(result).toEqual({ appBanWords: { bannedWord: 'banned' } });
  });

  it('should validate control without banned word', () => {
    directive.appBanWords = 'banned';

    const control: AbstractControl<string> = {
      value: 'not banned',
    } as AbstractControl<string>;

    const result = directive.validate(control);

    expect(result).toBeNull();
  });

  it('should validate control with banned word (case-insensitive)', () => {
    directive.appBanWords = 'banned';

    const control: AbstractControl<string> = {
      value: 'BANNED',
    } as AbstractControl<string>;

    const result = directive.validate(control);

    expect(result).toEqual({ appBanWords: { bannedWord: 'banned' } });
  });

  it('should validate control with banned words array', () => {
    directive.appBanWords = ['word1', 'word2'];

    const control: AbstractControl<string> = {
      value: 'word2',
    } as AbstractControl<string>;

    const result = directive.validate(control);

    expect(result).toEqual({ appBanWords: { bannedWord: 'word2' } });
  });

  it('should validate control without banned words array', () => {
    directive.appBanWords = ['word1', 'word2'];

    const control: AbstractControl<string> = {
      value: 'not banned',
    } as AbstractControl<string>;

    const result = directive.validate(control);

    expect(result).toBeNull();
  });
});
