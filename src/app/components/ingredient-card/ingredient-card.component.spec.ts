import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Config } from '../../../cfg/config';
import { AppModule } from '../../app.module';
import { IngredientCardComponent } from './ingredient-card.component';
import { SaqService } from '../../services/saq/saq.service';

import { SaqServiceStub } from '../../../test/stubs/saq-service.stub';
import { SaqAlcoholResult } from '../../../test/saq-cocktail-test.classes';

// passed as input to ingredient-card component
const ingredient = {
  name: 'Test Ingredient',
  quantity: 1
};

const alcoholImageUrl = Config.INGREDIENT_PHOTOS_PATH + 'mint_leaves.jpg';

// mock SAQ service results
const alcohol1 = new SaqAlcoholResult('alcohol 1', '500 ml', '100', alcoholImageUrl);
const alcohol2 = new SaqAlcoholResult('alcohol 2', '750 ml', '200', alcoholImageUrl);



let comp: IngredientCardComponent;
let fixture: ComponentFixture<IngredientCardComponent>;
let de: DebugElement;
let saqService: SaqService;

describe('IngredientCardComponent', () => {
  const saqServiceStub = new SaqServiceStub([alcohol1, alcohol2]);

  beforeEach(async(() => {
    TestBed
    .overrideComponent(IngredientCardComponent, {
      set: {
        providers: [{provide: SaqService, useValue: saqServiceStub}]
      }
    })
    .configureTestingModule({
      imports: [ AppModule ],
      providers: [{provide: SaqService, useValue: saqServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientCardComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    saqService = TestBed.get(SaqService);

    comp.index = 0;
    comp.name = ingredient.name;
    comp.quantity = ingredient.quantity;
  });

  it('should create an ingredient card', () => {
    expect(comp).toBeTruthy();
  });

  it('should display the title of the card', () => {
    fixture.detectChanges();

    const titleEl: HTMLDivElement = de.query(By.css('.title-text')).nativeElement;
    const expectedTitle = comp.formattedIngredientTitle();

    expect(titleEl.textContent).toBe(expectedTitle);
  });

  // Alcohol ingredient card
  describe('Alcohol Ingredient Card', () => {

    beforeEach(async(() => {
     comp.isAlcohol = true;
     fixture.detectChanges();
    }));

    it('displays the image of the alcohol', () => {
      const imageEl: HTMLImageElement = de.query(By.css('img')).nativeElement;

      expect(imageEl.src).toBe(Config.KARMA_ROOT_URL + comp.imageUrl);
    });

    it('displays the selected alcohol result\'s title, format and price', () => {
      const selectedResult = comp.selectedResult;
      const titleEl: HTMLFontElement = de.query(By.css('.alcohol-info h4')).nativeElement;
      const details: HTMLSpanElement[] = de.queryAll(By.css('.details span')).map(debugEl => debugEl.nativeElement);

      expect(titleEl.textContent).toBe(selectedResult.title, 'Alcohol title not displaying');
      expect(details[0].textContent).toBe(selectedResult.raw.tpformat, 'Alcohol format not displaying');
      expect(details[1].textContent).toBe(selectedResult.raw.tpprixnormal, 'Alcohol price not displaying');
    });

    it('navigates left and right between results', () => {
      const navButtons: HTMLButtonElement[] = de.queryAll(By.css('md-card-actions button')).map(debugEl => debugEl.nativeElement);
      const leftButton = navButtons[0];
      const rightButton = navButtons[1];

      leftButton.click();
      fixture.detectChanges();

      expect(comp.selectedResult.title).toBe(alcohol2.title, 'Left nav button does not work');

      rightButton.click();
      fixture.detectChanges();

      expect(comp.selectedResult.title).toBe(alcohol1.title, 'Right nav button does not work');
    });
  });

  // Other ingredient card
  describe('Other Ingredient Card', () => {

    beforeEach(async(() => {
      comp.isAlcohol = false;
      fixture.detectChanges();
    }));

    it('displays the image of the ingredient', () => {
      const imageEl: HTMLImageElement = de.query(By.css('img')).nativeElement;

      expect(imageEl.src).toBe(Config.KARMA_ROOT_URL + comp.imageUrl);
    });

    it('does not display alcohol-info section', () => {
      const alcoholInfoDe = de.query(By.css('.alcohol-info'));

      expect(alcoholInfoDe).toBeNull();
    });
  });
});
