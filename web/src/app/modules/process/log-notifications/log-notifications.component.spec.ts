import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNotificationsComponent } from './log-notifications.component';

describe('LogNotificationsComponent', () => {
  let component: LogNotificationsComponent;
  let fixture: ComponentFixture<LogNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
