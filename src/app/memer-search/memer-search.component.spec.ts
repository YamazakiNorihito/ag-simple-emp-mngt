import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemerSearchComponent } from './memer-search.component';

describe('MemerSearchComponent', () => {
  let component: MemerSearchComponent;
  let fixture: ComponentFixture<MemerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
