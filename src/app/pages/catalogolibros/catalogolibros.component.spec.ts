import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogolibrosComponent } from './catalogolibros.component';

describe('CatalogolibrosComponent', () => {
  let component: CatalogolibrosComponent;
  let fixture: ComponentFixture<CatalogolibrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogolibrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogolibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
