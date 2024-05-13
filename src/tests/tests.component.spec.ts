import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HeaderComponent} from "../components/Header/header.component";
import {NgForOf, NgOptimizedImage} from '@angular/common';
import {HomeComponent} from '../components/Home/home.component';
import {ServerService} from '../bll/store';
import {FormsModule} from "@angular/forms";
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TodoComponent} from '../components/ToDo/todo.component';
import {of} from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule, FormsModule, HttpClientTestingModule],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLoggedIn to false', () => {
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should set isLoggedIn to true if current_user_email is in localStorage', () => {
    localStorage.setItem('current_user_email', 'test@example.com');
    component.refresh();
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should remove current_user_email from localStorage and navigate to /login on logout', () => {
    localStorage.setItem('current_user_email', 'test@example.com');
    spyOn(component.router, 'navigate');
    component.logout();
    expect(localStorage.getItem('current_user_email')).toBeNull();
    expect(component.isLoggedIn).toBeFalse();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [],
        imports: [
          HomeComponent,
          RouterTestingModule,
          HeaderComponent,
          NgOptimizedImage,
          NgForOf
        ],
        providers: [],
      }).compileComponents();

      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have a header component', () => {
      const headerElement = fixture.nativeElement.querySelector('app-header');
      expect(headerElement).toBeTruthy();
    });

    it('should use NgOptimizedImage directive', () => {
      const optimizedImageElements = fixture.nativeElement.querySelectorAll('img[loading]');
      expect(optimizedImageElements.length).toBeGreaterThan(0);
    });

    it('should use NgForOf directive', () => {
      const ngForElements = fixture.nativeElement.querySelectorAll('[ngFor]');
      expect(ngForElements.length).toBeGreaterThan(0);
    });
  });

  // describe('LoginComponent', () => {
  //   let component: LoginComponent;
  //   let fixture: ComponentFixture<LoginComponent>;
  //   let serverService: ServerService;
  //
  //   beforeEach(async () => {
  //     await TestBed.configureTestingModule({
  //       declarations: [],
  //       imports: [
  //         LoginComponent,
  //         RouterTestingModule,
  //         HttpClientTestingModule,
  //         FormsModule,
  //         NgIf
  //       ],
  //       providers: [
  //         ServerService
  //       ]
  //     }).compileComponents();
  //
  //     fixture = TestBed.createComponent(LoginComponent);
  //     component = fixture.componentInstance;
  //     serverService = TestBed.inject(ServerService);
  //     fixture.detectChanges();
  //   });
  //
  //   it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });
  //
  //   it('should generate a captcha', () => {
  //     component.generateCaptcha();
  //     expect(component.generatedCaptcha).toBeTruthy();
  //     expect(component.generatedCaptcha?.length).toBe(6);
  //   });
  //
  //   it('should check captcha validity', () => {
  //     component.generatedCaptcha = 'abcdef';
  //     component.userInput = 'abcdef';
  //     component.checkCaptcha();
  //     expect(component.isCaptchaValid).toBeTrue();
  //   });
  //
  //   it('should login successfully', () => {
  //       spyOn(serverService, 'login').and.returnValue(
  //         of({ message: 'Success' })
  //       );
  //
  //       component.login('test@example.com', 'password');
  //       expect(localStorage.getItem('current_user_email')).toBe('test@example.com');
  //     });
  //
  //   it('should handle login error', () => {
  //       spyOn(serverService, 'login').and.returnValue(
  //         of({ error: 'Error' }).pipe(
  //           tap((error) => {
  //             throw error;
  //           })
  //         )
  //       );
  //
  //       component.login('test@example.com', 'password');
  //       expect(localStorage.getItem('current_user_email')).toBeNull();
  //     });
  // });

  // describe('SignupComponent', () => {
  //   let component: SignupComponent;
  //   let fixture: ComponentFixture<SignupComponent>;
  //   let serverService: ServerService;
  //
  //   beforeEach(async () => {
  //     await TestBed.configureTestingModule({
  //       declarations: [],
  //       imports: [FormsModule, RouterTestingModule, SignupComponent, HttpClientTestingModule],
  //       providers: [ServerService]
  //     }).compileComponents();
  //
  //     fixture = TestBed.createComponent(SignupComponent);
  //     component = fixture.componentInstance;
  //     serverService = TestBed.inject(ServerService);
  //     fixture.detectChanges();
  //   });
  //
  //   it('should create', () => {
  //     expect(component).toBeTruthy();
  //   });
  //
  //   it('should navigate to login after successful signup', () => {
  //     spyOn(serverService, 'register').and.returnValue(of({ message: 'Success' }));
  //
  //     const navigateSpy = spyOn(component.router, 'navigate');
  //     component.signup('test@example.com', 'password');
  //
  //     expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  //   });
  //
  //   it('should log error on signup failure', () => {
  //     spyOn(console, 'error');
  //     spyOn(serverService, 'register').and.returnValue(of({ error: 'Error' }));
  //
  //     component.signup('test@example.com', 'password');
  //
  //     expect(console.error).toHaveBeenCalled();
  //   });
  // });

  describe('TodoComponent', () => {
    let component: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;
    let serverService: ServerService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TodoComponent, RouterTestingModule, HttpClientTestingModule],
        providers: [ServerService],
        declarations: [],
      }).compileComponents();

      fixture = TestBed.createComponent(TodoComponent);
      component = fixture.componentInstance;
      serverService = TestBed.inject(ServerService);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load notes on initialization', () => {
      const notes = [{ id: 1, title: 'Test Note', text: 'This is a test note', status: 'active' }];
      spyOn(serverService, 'getNotes').and.returnValue(of({ notes: notes }));

      component.ngOnInit();

      expect(component.notes).toEqual(notes);
      expect(component.loading).toBeFalse();
    });

    it('should add a new note', () => {
      const newNote = { title: 'New Note', text: 'This is a new note', status: 'active' };
      spyOn(serverService, 'addNote').and.returnValue(of(newNote));

      component.title = newNote.title;
      component.text = newNote.text;
      component.addNote();

      expect(component.notes).toContain(newNote);
      expect(component.title).toBe('');
      expect(component.text).toBe('');
    });

    it('should edit a note', () => {
      const note = { id: 1, title: 'Test Note', text: 'This is a test note', status: 'active' };
      const updatedTitle = 'Updated Title';
      const updatedText = 'Updated Text';
      const updatedStatus = 'completed';
      spyOn(window, 'prompt').and.returnValues(updatedTitle, updatedText, updatedStatus);
      spyOn(serverService, 'updateNote').and.returnValue(of({ message: 'Note updated successfully' }));

      component.editNote(note);

      expect(component.notes[0].title).toBe(updatedTitle);
      expect(component.notes[0].text).toBe(updatedText);
      expect(component.notes[0].status).toBe(updatedStatus);
    });

    it('should delete a note', () => {
      const noteId = 1;
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(serverService, 'deleteNote').and.returnValue(of({ message: 'Note deleted successfully' }));

      component.deleteNote(noteId);

      expect(component.notes.length).toBe(0);
    });

    it('should apply filter and sort notes alphabetically', () => {
      component.notes = [
        {id: 1, title: 'C Note', text: 'This is a C note', status: 'active'},
        {id: 2, title: 'A Note', text: 'This is an A note', status: 'active'},
        {id: 3, title: 'B Note', text: 'This is a B note', status: 'active'}
      ];

      component.applyFilter('alphabetical_asc');

      expect(component.notes[0].title).toBe('A Note');
      expect(component.notes[1].title).toBe('B Note');
      expect(component.notes[2].title).toBe('C Note');
    });
  });