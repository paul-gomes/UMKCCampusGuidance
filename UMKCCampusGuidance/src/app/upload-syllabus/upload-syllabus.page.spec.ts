import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadSyllabusPage } from './upload-syllabus.page';

describe('UploadSyllabusPage', () => {
  let component: UploadSyllabusPage;
  let fixture: ComponentFixture<UploadSyllabusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSyllabusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadSyllabusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
