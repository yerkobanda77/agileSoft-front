import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrenoComponent } from './estreno.component';

describe('EstrenoComponent', () => {
  let component: EstrenoComponent;
  let fixture: ComponentFixture<EstrenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstrenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstrenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
