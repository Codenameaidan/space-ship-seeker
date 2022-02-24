import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureOfTheDayComponent } from './picture-of-the-day.component';

describe('PictureOfTheDayComponent', () => {
  let component: PictureOfTheDayComponent;
  let fixture: ComponentFixture<PictureOfTheDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureOfTheDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
