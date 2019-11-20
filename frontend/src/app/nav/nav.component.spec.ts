import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavComponent } from './nav.component';
import { By } from '@angular/platform-browser';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should have router outlet', () => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet))
    expect(de).not.toBeNull()
  })

  it('should have a link to the main/ compare page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref))
    let index = debugElements.findIndex(de => de.properties['href'] === '/main')
    expect(index).toBeGreaterThan(-1)
  })

  it('should have a link to the /collect page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref))
    let index = debugElements.findIndex(de => de.properties['href'] === '/collect')
    expect(index).toBeGreaterThan(-1)
  })
});
