import { TestBed } from '@angular/core/testing';
import { TemplateFormsPageComponent } from './template-forms-page.component';

describe('TemplateFormsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TemplateFormsPageComponent
      ],
    }).compileComponents();
  });

  it('should create the Component', () => {
    const fixture = TestBed.createComponent(TemplateFormsPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
