import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmapComponent } from './osmap.component';

describe('OsmapComponent', () => {
  let component: OsmapComponent;
  let fixture: ComponentFixture<OsmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
