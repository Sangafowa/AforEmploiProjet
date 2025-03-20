import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully', () => {
    expect(service.login('admin@afor.com', 'admin123')).toBeTrue();
  });

  it('should return false for incorrect credentials', () => {
    expect(service.login('wrong', 'wrong')).toBeFalse();
  });

  it('should logout successfully', () => {
    service.login('admin@afor.com', 'admin123');
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });
});
