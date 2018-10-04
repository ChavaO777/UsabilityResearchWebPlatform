import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from '../../../services/crud.service';
import { AuthService } from '../../../services/auth.service';
import { AuthMockService } from '../../../services/auth-mock.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ExperimentListComponent } from './experiment-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExperimentListComponent', () => {
  let component: ExperimentListComponent;
  let fixture: ComponentFixture<ExperimentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        AuthService,
        CrudService,
        ErrorHandlerService,
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();

    // Call the auth mock service to have a user with an id in the 
    // local storage
    let authMock = new AuthMockService();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(function() {

    localStorage.removeItem('user');
  });
});
