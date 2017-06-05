import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppModule } from '../../app.module';
import { InfoCardComponent } from './info-card.component';

const inputData = {
  title: 'Title',
  infos: ['a', 'b', 'c']
};

let comp: InfoCardComponent;
let fixture: ComponentFixture<InfoCardComponent>;
let de: DebugElement;

describe('InfoCardComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    comp.title = inputData.title;
    comp.infos = inputData.infos;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(comp).toBeTruthy();
  });

  it('should display the inputted title', () => {
    const titleEl: HTMLFontElement = de.query(By.css('md-card-title h4')).nativeElement;

    expect(titleEl.textContent).toBe(inputData.title);
  });

  it('should display each info in a separate md-card-content element', () => {
    const contentEls: HTMLElement[] = de.queryAll(By.css('md-card-content')).map(debugEl => debugEl.nativeElement);
    const firstContent = contentEls[0];

    expect(contentEls.length).toEqual(inputData.infos.length, 'Not all infos are being displayed');
    expect(firstContent.textContent).toBe(inputData.infos[0], 'First content element does not contain first inputted info');
  });
});
