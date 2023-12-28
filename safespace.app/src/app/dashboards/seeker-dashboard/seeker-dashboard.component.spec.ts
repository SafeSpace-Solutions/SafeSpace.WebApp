import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SeekerDashboardComponent } from './seeker-dashboard.component';
import { DashboardSharedModule } from '../shared/dashboard-shared.module';

describe('SeekerDashboardComponent', () => {
  let component: SeekerDashboardComponent;
  let fixture: ComponentFixture<SeekerDashboardComponent>;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerDashboardComponent],
      imports: [
        DashboardSharedModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SeekerDashboardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    // Spy on the router navigate method
    spyOn(router, 'navigate').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home if current path is empty', () => {
    spyOn(location, 'path').and.returnValue('');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /home if current path is /', () => {
    spyOn(location, 'path').and.returnValue('/');
    fixture.detectChanges(); 
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to current path if it is not empty or /', () => {
    const testPath = '/chat';
    spyOn(location, 'path').and.returnValue(testPath);
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([testPath]);
  });
});
