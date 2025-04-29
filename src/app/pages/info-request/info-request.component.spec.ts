import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRequestComponent } from './info-request.component';

describe('InfoRequestComponent', () => {
  let component: InfoRequestComponent;
  let fixture: ComponentFixture<InfoRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
