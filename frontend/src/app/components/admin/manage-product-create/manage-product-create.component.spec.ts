import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductCreateComponent } from './manage-product-create.component';

describe('ManageProductCreateComponent', () => {
  let component: ManageProductCreateComponent;
  let fixture: ComponentFixture<ManageProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
