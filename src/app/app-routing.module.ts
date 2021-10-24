import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './views/menu/menu.component';
import { StageComponent } from './views/stage/stage.component';
import { UploadComponent } from './views/upload/upload.component';
import { VoteComponent } from './views/vote/vote.component';

const routes: Routes = 
[ 
  { path: '', component: MenuComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'vote', component: VoteComponent},
  {path: 'stage', component: StageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
