import { TestBed } from '@angular/core/testing';

import { StatusDropdownDataService } from './status-dropdown-data.service';

describe('StatusDropdownDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusDropdownDataService = TestBed.get(StatusDropdownDataService);
    expect(service).toBeTruthy();
  });
});
