import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimecounterComponent } from './timecounter.component';

describe('TimecounterComponent', () => {
  let component: TimecounterComponent;
  let fixture: ComponentFixture<TimecounterComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [TimecounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimecounterComponent);
    component = fixture.componentInstance;
    component.inputData = { title: 'test', targetDate: new Date(), plus: true };
    fixture.detectChanges();
  });

  it('組件建立', () => {
    expect(component).toBeTruthy();
  });

  it('初始化內容檢查', () => {
    expect(component.days).toBe(0);
    expect(component.hours).toBe(0);
    expect(component.min).toBe(0);
    expect(component.sec).toBe(0);
  });

  it('init時方法被正確調用', () => {
    spyOn(component, 'startCountdown');
    component.ngOnInit();
    expect(component.startCountdown).toHaveBeenCalled();
  });

  it('正確停止計時器', () => {
    spyOn(component["destroy$"], 'next');
    spyOn(component["destroy$"], 'complete');
    component.ngOnDestroy();
    expect(component["destroy$"].next).toHaveBeenCalled();
    expect(component["destroy$"].complete).toHaveBeenCalled();
  });

  it('排版檢測', (done) => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
    fixture.detectChanges();
    
    setTimeout(() => {
      // NOTE:
      const outBox = fixture.nativeElement.querySelector('#outBoxTest');
      expect(outBox).toBeTruthy();
      const rect = outBox.getBoundingClientRect();
      expect(window.innerWidth).toBe(1200);
      expect(rect.width).toBeLessThanOrEqual(window.innerWidth);
      expect(rect.height).toBeLessThanOrEqual(window.innerHeight);

      expect(rect.right).toBeLessThanOrEqual(window.innerWidth);
      expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight);
      
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
      fixture.detectChanges();

      setTimeout(() => {
        // NOTE: 檢查環境視窗是否是 700px
        expect(window.innerWidth).toBe(500);
        const resizeOutBox = fixture.nativeElement.querySelector('#outBoxTest');
        const resizeRect = resizeOutBox.getBoundingClientRect();
        expect(resizeRect.width).toBeLessThanOrEqual(window.innerWidth);
        expect(resizeRect.height).toBeLessThanOrEqual(window.innerHeight);
    
        expect(resizeRect.right - 50).toBeLessThanOrEqual(window.innerWidth);
        expect(resizeRect.bottom - 50).toBeLessThanOrEqual(window.innerHeight);
    
        let leftPixel = resizeRect.left;
        let rightPixel = resizeRect.right;
        console.log("leftPixel", leftPixel);
        console.log("rightPixel", rightPixel);
    
        expect(leftPixel).toBe(50);
        expect(rightPixel).toBe(550);
        done();
      }, 100);
    }, 100
    );
  })
});