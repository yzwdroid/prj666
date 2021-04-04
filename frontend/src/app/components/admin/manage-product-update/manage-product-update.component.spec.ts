import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductUpdateComponent } from './manage-product-update.component';

describe('ManageProductUpdateComponent', () => {
  let component: ManageProductUpdateComponent;
  let fixture: ComponentFixture<ManageProductUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
