import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcameraComponent } from './addcamera.component';

describe('AddcameraComponent', () => {
  let component: AddcameraComponent;
  let fixture: ComponentFixture<AddcameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcameraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
