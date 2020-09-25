import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { RestfulGitSharedModule } from 'app/shared/shared.module';
import { RestfulGitCoreModule } from 'app/core/core.module';
import { RestfulGitAppRoutingModule } from './app-routing.module';
import { RestfulGitHomeModule } from './home/home.module';
import { RestfulGitEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    RestfulGitSharedModule,
    RestfulGitCoreModule,
    RestfulGitHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    RestfulGitEntityModule,
    RestfulGitAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class RestfulGitAppModule {}
