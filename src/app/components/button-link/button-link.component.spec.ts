/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ButtonLinkComponent } from './button-link.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ButtonLinkComponent', () => {
  let component: ButtonLinkComponent;
  let fixture: ComponentFixture<ButtonLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonLinkComponent],
      imports: [MatIconModule, RouterModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
