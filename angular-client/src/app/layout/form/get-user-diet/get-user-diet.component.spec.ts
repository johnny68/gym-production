import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserDietComponent } from './get-user-diet.component';

describe('GetUserDietComponent', () => {
  let component: GetUserDietComponent;
  let fixture: ComponentFixture<GetUserDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUserDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUserDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
