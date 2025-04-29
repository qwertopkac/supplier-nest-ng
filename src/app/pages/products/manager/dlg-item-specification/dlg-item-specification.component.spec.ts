import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgItemSpecificationComponent } from './dlg-item-specification.component';

describe('DlgItemSpecificationComponent', () => {
  let component: DlgItemSpecificationComponent;
  let fixture: ComponentFixture<DlgItemSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DlgItemSpecificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DlgItemSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
