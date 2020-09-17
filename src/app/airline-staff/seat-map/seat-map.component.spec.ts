import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatMapComponent } from './seat-map.component';
import { Store } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';

describe('SeatMapComponent', () => {
  let component: SeatMapComponent;
  let fixture: ComponentFixture<SeatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [SeatMapComponent],
      providers: [{
        provide: Store
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return midline if value is not A/B/C/D/E/F', () => {
    const returnedValue = component.getClassname('1', '');
    expect(returnedValue).toBe('midline');
  });
  it('should return available if ischecked is true', () => {
    const returnedValue = component.getClassname('5', 'B');
    expect(returnedValue).toBe('available');
  });
});
