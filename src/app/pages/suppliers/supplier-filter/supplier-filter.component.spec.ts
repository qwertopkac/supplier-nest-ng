import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierFilterComponent } from './supplier-filter.component';

describe('SupplierFilterComponent', () => {
  let component: SupplierFilterComponent;
  let fixture: ComponentFixture<SupplierFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
