import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadSchedulePage } from './upload-schedule.page';

describe('UploadSchedulePage', () => {
  let component: UploadSchedulePage;
  let fixture: ComponentFixture<UploadSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
