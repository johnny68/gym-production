import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserBillingComponent } from './get-user-billing.component';

describe('GetUserBillingComponent', () => {
  let component: GetUserBillingComponent;
  let fixture: ComponentFixture<GetUserBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetUserBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetUserBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
