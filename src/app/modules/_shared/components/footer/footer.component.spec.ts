import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { LplUserService } from "@core/lpl-core/service/lpl-user.service";
import { CommunicationService } from "../../services/communication.service";
import { ModalModule } from 'ngx-bootstrap/modal';
import { ApiService } from '@core/lpl-core/service/api.service';
import { LplRestService } from '@core/lpl-core/service/lpl-rest.service';
import { LplCookieService } from '@core/lpl-core/service/lpl-cookie.service';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ModalModule.forRoot(),RouterModule,HttpClientModule,RouterTestingModule],
      providers:[BsModalService,BsModalRef,LplUserService,CommunicationService,ApiService,LplRestService,CookieService,LplCookieService],
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
