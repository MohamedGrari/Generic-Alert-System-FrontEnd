import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerItemComponent } from './employer-item.component';

describe('EmployerItemComponent', () => {
  let component: EmployerItemComponent;
  let fixture: ComponentFixture<EmployerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
