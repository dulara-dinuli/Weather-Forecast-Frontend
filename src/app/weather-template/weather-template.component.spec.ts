import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTemplateComponent } from './weather-template.component';

describe('WeatherTemplateComponent', () => {
  let component: WeatherTemplateComponent;
  let fixture: ComponentFixture<WeatherTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
