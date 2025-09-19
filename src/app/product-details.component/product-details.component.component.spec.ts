import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetails.ComponentComponent } from './product-details.component.component';

describe('ProductDetails.ComponentComponent', () => {
  let component: ProductDetails.ComponentComponent;
  let fixture: ComponentFixture<ProductDetails.ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetails.ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetails.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
