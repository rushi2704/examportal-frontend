import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import path from 'path';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',

  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
  },
{
  path:'login',
  component:LoginComponent,
  pathMatch:'full',
},
{
  path:'admin',
  component:DashboardComponent,
  canActivate:[AdminGuard],
  children:[
    {
      path:'',
      component:WelcomeComponent,
    },
   
    {
      path:'profile',
      component:ProfileComponent,
    },
    {
      path:'categories',
      component:ViewCategoriesComponent,

    },
    {
      path:'add-category',
      component:AddCategoryComponent,

    },
    {
      path:'view-quizzes',
      component:ViewQuizzesComponent,

    },
    {
      path:'add-quizzes',
      component:AddQuizzesComponent,

    },
    {
      path:'quiz/:qid',
      component:UpdateQuizComponent,

    },
    {
      path:'view-questions/:qid/:title',
      component:ViewQuestionsComponent,

    },
    {
      path:'add-question/:qid/:title',
      component:AddQuestionComponent,

    },
    {
      path:'update-question/:qid/:title',
      component:UpdateQuestionComponent,

    },
   
    
  ],
},
{
  path:'user-dashboard',
  component:UserDashboardComponent,
  canActivate:[NormalGuard],
  children:[
    {
      path:':catId',
      component:LoadQuizComponent,
    },
    {
      path:'instructions/:qid',
      component:InstructionsComponent,
    },
    
  ],
},

{
  path:'start/:qid',
  component:StartComponent,
  canActivate:[NormalGuard],
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
