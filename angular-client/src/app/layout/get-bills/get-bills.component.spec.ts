import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBillsComponent } from './get-bills.component';

describe('GetBillsComponent', () => {
  let component: GetBillsComponent;
  let fixture: ComponentFixture<GetBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
