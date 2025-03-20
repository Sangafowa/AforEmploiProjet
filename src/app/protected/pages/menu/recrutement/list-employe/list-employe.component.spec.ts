import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEmployeComponent } from './list-employe.component';
import { FormsModule } from '@angular/forms';

describe('ListEmployeComponent', () => {
  let component: ListEmployeComponent;
  let fixture: ComponentFixture<ListEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEmployeComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter employees', () => {
    component.searchText = 'Doe';
    expect(component.filteredEmployees().length).toBe(1);
  });
});
