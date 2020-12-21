import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSimpleComponent } from './create-simple.component';

describe('CreateSimpleComponent', () => {
  let component: CreateSimpleComponent;
  let fixture: ComponentFixture<CreateSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
