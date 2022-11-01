import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

/* tslint:disable */ 
const routes: Routes = [
  { path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  }, // ================= Auth start ===================================
  { 
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthPageModule',
  },
  { 
    path: 'forgot-password',
    loadChildren: './pages/auth/forgot-password/forgot-password.module#ForgotPasswordPageModule'
  },
  { 
    path: 'dashboard', 
    loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
    canLoad: [AuthGuard]  
  }, // ================= Organization Manager start (list)==================================
  { path: 'location-list', 
    loadChildren: './pages/organization-manager/locations-list/locations-list.module#LocationsListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'country', 
    loadChildren: './pages/organization-manager/country-list/country-list.module#CountryListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'state', 
    loadChildren: './pages/organization-manager/states-list/states-list.module#StatesListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'currency-list', 
    loadChildren: './pages/organization-manager/currency-list/currency-list.module#CurrencyListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'pages-list', 
    loadChildren: './pages/organization-manager/pages-list/pages-list.module#PagesListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'module-list', 
    loadChildren: './pages/organization-manager/modules-list/modules-list.module#ModulesListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'role-list', 
    loadChildren: './pages/organization-manager/role-list/role-list.module#RoleListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'account-list', 
    loadChildren: './pages/organization-manager/account-list/account-list.module#AccountListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'city', 
    loadChildren: './pages/organization-manager/city-list/city-list.module#CityListPageModule',
    canLoad: [AuthGuard] 
  }, //-------------add edit Organization Manager start-------------------
  { 
    path: 'add-location/:action/:id', 
    loadChildren: './pages/organization-manager/add-location/add-location.module#AddLocationPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-country/:action/:id', 
    loadChildren: './pages/organization-manager/add-country/add-country.module#AddCountryPageModule',
    canLoad: [AuthGuard]
  },
  { 
    path: 'add-state/:action/:id', 
    loadChildren: './pages/organization-manager/add-state/add-state.module#AddStatePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-currency/:action/:id', 
    loadChildren: './pages/organization-manager/add-currency/add-currency.module#AddCurrencyPageModule',
    canLoad: [AuthGuard]
  },
  { 
    path: 'add-page/:action/:id', 
    loadChildren: './pages/organization-manager/add-page/add-page.module#AddPagePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-module/:action/:id', 
    loadChildren: './pages/organization-manager/add-module/add-module.module#AddModulePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-role/:action/:id', 
    loadChildren: './pages/organization-manager/add-role/add-role.module#AddRolePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-accounts/:action/:id', 
    loadChildren: './pages/organization-manager/add-accounts/add-accounts.module#AddAccountsPageModule',
    canLoad: [AuthGuard]  
  },
  { path: 'add-city/:action/:id', 
    loadChildren: './pages/organization-manager/add-city/add-city.module#AddCityPageModule',
    canLoad: [AuthGuard]  
  }, //----- Organization Manager end -----
  // ================= Master Types start ==================================
  { 
    path: 'employee-list', 
    loadChildren: './pages/master_types/employee-list/employee-list.module#EmployeeListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'fiscalyear-list', 
    loadChildren: './pages/master_types/fiscal-year-list/fiscal-year-list.module#FiscalYearListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'accountbranch-list', 
    loadChildren: './pages/master_types/account-list/account-list.module#AccountListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'phonetype-list', 
    loadChildren: './pages/master_types/phonetype-list/phonetype-list.module#PhonetypeListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'emailtype-list', 
    loadChildren: './pages/master_types/emailtype-list/emailtype-list.module#EmailtypeListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'addresstype-list', 
    loadChildren: './pages/master_types/addresstype-list/addresstype-list.module#AddresstypeListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'graceday', 
    loadChildren: './pages/master_types/graceday-list/graceday-list.module#GracedayListPageModule',
    canLoad: [AuthGuard]   
  },
  { 
    path: 'industry_type', 
    loadChildren: './pages/master_types/industry-type-list/industry-type-list.module#IndustryTypeListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'company_type', 
    loadChildren: './pages/master_types/company-type-list/company-type-list.module#CompanyTypeListPageModule',
    canLoad: [AuthGuard] 
  },
  {
    path: 'category', 
    loadChildren: './pages/master_types/category-list/category-list.module#CategoryListPageModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'category/:id', 
    loadChildren: './pages/master_types/category-list/category-list.module#CategoryListPageModule',
    canLoad: [AuthGuard]
  },
  { 
    path: 'adminmenu', 
    loadChildren: './pages/master_types/adminmenu-list/adminmenu-list.module#AdminmenuListPageModule',
    canLoad: [AuthGuard]   
  },
  { 
    path: 'adminmenu/:id', 
    loadChildren: './pages/master_types/adminmenu-list/adminmenu-list.module#AdminmenuListPageModule',
    canLoad: [AuthGuard]   
  },
  { 
    path: 'site', 
    loadChildren: './pages/master_types/site-list/site-list.module#SiteListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'variable', 
    loadChildren: './pages/master_types/system-variable-list/system-variable-list.module#SystemVariableListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'email', 
    loadChildren: './pages/master_types/email-template-list/email-template-list.module#EmailTemplateListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'college', 
    loadChildren: './pages/master_types/collage-list/collage-list.module#CollageListPageModule',
    canLoad: [AuthGuard] 
  },//-------------add edit Master Types start-------------------
  { 
    path: 'add-employee/:action/:id', 
    loadChildren: './pages/master_types/add-employee/add-employee.module#AddEmployeePageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-fiscalyear/:action/:id', 
    loadChildren: './pages/master_types/add-fiscalyear/add-fiscalyear.module#AddFiscalyearPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-account/:action/:id', 
    loadChildren: './pages/master_types/add-account/add-account.module#AddAccountPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-phonetype/:action/:id', 
    loadChildren: './pages/master_types/add-phonetype/add-phonetype.module#AddPhonetypePageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-emailtype/:action/:id', 
    loadChildren: './pages/master_types/add-emailtype/add-emailtype.module#AddEmailtypePageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-addresstype/:action/:id', 
    loadChildren: './pages/master_types/add-addresstype/add-addresstype.module#AddAddresstypePageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-graceday/:action/:id', 
    loadChildren: './pages/master_types/add-graceday/add-graceday.module#AddGracedayPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-industry-type/:action/:id', 
    loadChildren: './pages/master_types/add-industry-type/add-industry-type.module#AddIndustryTypePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-company-type/:action/:id', 
    loadChildren: './pages/master_types/add-company-type/add-company-type.module#AddCompanyTypePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-category/:action/:id', 
    loadChildren: './pages/master_types/add-category/add-category.module#AddCategoryPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-adminmenu/:action/:id', 
    loadChildren: './pages/master_types/add-adminmenu/add-adminmenu.module#AddAdminmenuPageModule',
    canLoad: [AuthGuard]   
  },
  { 
    path: 'add-site/:action/:id', 
    loadChildren: './pages/master_types/add-site/add-site.module#AddSitePageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-variable/:action/:id', 
    loadChildren: './pages/master_types/add-system-variable/add-system-variable.module#AddSystemVariablePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-email/:action/:id', 
    loadChildren: './pages/master_types/add-email-template/add-email-template.module#AddEmailTemplatePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-college/:action/:id', 
    loadChildren: './pages/master_types/add-collage/add-collage.module#AddCollagePageModule',
    canLoad: [AuthGuard]  
  },
  // ----- Master Types end ------
  //===== error page ======
  { 
    path: 'error', 
    loadChildren: './pages/error/error.module#ErrorPageModule' 
  },
  //=================  corporate company start ================
  //----- list------
  { 
    path: 'company', 
    loadChildren: './pages/corporate_company/company-list/company-list.module#CompanyListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'company_category', 
    loadChildren: './pages/corporate_company/company-category-list/company-category-list.module#CompanyCategoryListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'associate', 
    loadChildren: './pages/corporate_company/associate-list/associate-list.module#AssociateListPageModule',
    canLoad: [AuthGuard]  
  }, 
  // add-edit
  { 
    path: 'add-company/:action/:id', 
    loadChildren: './pages/corporate_company/add-company/add-company.module#AddCompanyPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-company-category/:action/:id', 
    loadChildren: './pages/corporate_company/add-company-category/add-company-category.module#AddCompanyCategoryPageModule',
    canLoad: [AuthGuard]  
  },
  // ------corporate company end----
  //=================  skill management start ================
  //----- list------
  { 
    path: 'skill', 
    loadChildren: './pages/skill_management/skill-list/skill-list.module#SkillListPageModule',
    canLoad: [AuthGuard]  
   },
   { 
    path: 'skill_qualification', 
    loadChildren: './pages/skill_management/skill-qualification-list/skill-qualification-list.module#SkillQualificationListPageModule',
    canLoad: [AuthGuard]  
   },
   { 
    path: 'skill_qual_degree', 
    loadChildren: './pages/skill_management/skill-degree-list/skill-degree-list.module#SkillDegreeListPageModule',
    canLoad: [AuthGuard] 
   },
   { 
    path: 'skill_qual_interest', 
    loadChildren: './pages/skill_management/skill-interest-list/skill-interest-list.module#SkillInterestListPageModule',
    canLoad: [AuthGuard] 
   },
   { 
    path: 'skill_qual_subject', 
    loadChildren: './pages/skill_management/skill-subject-list/skill-subject-list.module#SkillSubjectListPageModule',
    canLoad: [AuthGuard] 
   },
  // add-edit
  { 
    path: 'add-skill/:action/:id', 
    loadChildren: './pages/skill_management/add-skill/add-skill.module#AddSkillPageModule',
    canLoad: [AuthGuard]   
  },
  { 
    path: 'add-skill-qualification/:action/:id', 
    loadChildren: './pages/skill_management/add-skill-qualification/add-skill-qualification.module#AddSkillQualificationPageModule',
    canLoad: [AuthGuard]   
  },
  { 
    path: 'add-skill-degree/:action/:id', 
    loadChildren: './pages/skill_management/add-skill-degree/add-skill-degree.module#AddSkillDegreePageModule',
    canLoad: [AuthGuard]
  },
  { 
    path: 'add-skill-interest/:action/:id', 
    loadChildren: './pages/skill_management/add-skill-interest/add-skill-interest.module#AddSkillInterestPageModule',
    canLoad: [AuthGuard]
  },
  { 
    path: 'add-skill-subject/:action/:id', 
    loadChildren: './pages/skill_management/add-skill-subject/add-skill-subject.module#AddSkillSubjectPageModule',
    canLoad: [AuthGuard]
  },
  
  //-----skill management end------  
  //=================  job management start ================
  //----- list------
  { 
    path: 'job', 
    loadChildren: './pages/job_management/job-list/job-list.module#JobListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'job_type', 
    loadChildren: './pages/job_management/job-type-list/job-type-list.module#JobTypeListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'applied-job', 
    loadChildren: './pages/job_management/applied-job/applied-job.module#AppliedJobPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'subscriber', 
    loadChildren: './pages/user_management/subscriber/subscriber.module#SubscriberPageModule',
    canLoad: [AuthGuard] 
  },
  // add-edit
  { 
    path: 'add-job/:action/:id', 
    loadChildren: './pages/job_management/add-job/add-job.module#AddJobPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-job-type/:action/:id', 
    loadChildren: './pages/job_management/add-job-type/add-job-type.module#AddJobTypePageModule',
    canLoad: [AuthGuard]  
  },
// -- job management end --
//=================  cms management start ================
  // list
  { 
    path: 'cms', 
    loadChildren: './pages/cms_management/cms-list/cms-list.module#CmsListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'menu', 
    loadChildren: './pages/cms_management/menu-list/menu-list.module#MenuListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'menu/:id', 
    loadChildren: './pages/cms_management/menu-list/menu-list.module#MenuListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'banner', 
    loadChildren: './pages/cms_management/banner-list/banner-list.module#BannerListPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'faq', 
    loadChildren: './pages/cms_management/faq-list/faq-list.module#FaqListPageModule',
    canLoad: [AuthGuard] 
  },
  { path: 'notification',
    loadChildren: './pages/cms_management/notification/notification.module#NotificationPageModule',
    canLoad: [AuthGuard]
  },
  // add-edit
  { 
    path: 'add-cms/:action/:id', 
    loadChildren: './pages/cms_management/add-cms/add-cms.module#AddCmsPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-menu/:action/:id', 
    loadChildren: './pages/cms_management/add-menu/add-menu.module#AddMenuPageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-banner/:action/:id', 
    loadChildren: './pages/cms_management/add-banner/add-banner.module#AddBannerPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-faq/:action/:id', 
    loadChildren: './pages/cms_management/add-faq/add-faq.module#AddFaqPageModule',
    canLoad: [AuthGuard]  
  },
  { path: 'add-notification/:action/:id',
    loadChildren: './pages/cms_management/add-notification/add-notification.module#AddNotificationPageModule',
    canLoad: [AuthGuard]
  },
  // -- cms management end --
//=================  assessment management start ================
  // list
  { 
    path: 'question_subject', 
    loadChildren: './pages/assessment_management/question-subject/question-subject.module#QuestionSubjectPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'question', 
    loadChildren: './pages/assessment_management/question-list/question-list.module#QuestionListPageModule',
    canLoad: [AuthGuard]   
  },
  // add edit
  { 
    path: 'add-question-subject/:action/:id', 
    loadChildren: './pages/assessment_management/add-question-subject/add-question-subject.module#AddQuestionSubjectPageModule',
    canLoad: [AuthGuard]   
  },
  { 
    path: 'add-question/:action/:id', 
    loadChildren: './pages/assessment_management/add-question/add-question.module#AddQuestionPageModule',
    canLoad: [AuthGuard]  
  },// -- assessment management end --
//=================  assessment management start ================
  // list
  { 
    path: 'user', 
    loadChildren: './pages/user_management/user-list/user-list.module#UserListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'appuser', 
    loadChildren: './pages/user_management/app-user/app-user.module#AppUserPageModule',
    canLoad: [AuthGuard]
  },
  { 
    path: 'role', 
    loadChildren: './pages/user_management/role-list/role-list.module#RoleListPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'contact', 
    loadChildren: './pages/user_management/contact-list/contact-list.module#ContactListPageModule',
    canLoad: [AuthGuard]  
  },
  // add edit
  { 
    path: 'add-user/:action/:id', 
    loadChildren: './pages/user_management/add-user/add-user.module#AddUserPageModule',
    canLoad: [AuthGuard]  
  },
  { 
    path: 'add-role/:action/:id', 
    loadChildren: './pages/user_management/add-role/add-role.module#AddRolePageModule',
    canLoad: [AuthGuard] 
  },
  { 
    path: 'add-app-user/:action/:id',
    loadChildren: './pages/user_management/add-app-user/add-app-user.module#AddAppUserPageModule',
    canLoad: [AuthGuard] 
  },


// -- assessment management end --
// =================== member Management start ===================

  // member List
  { 
    path: 'member',
    loadChildren: './pages/student_management/student-list/student-list.module#StudentListPageModule',
    canLoad: [AuthGuard] 
  },
  // add-member
  { path: 'add-member/:action/:id',
    loadChildren: './pages/student_management/add-member/add-member.module#AddMemberPageModule',
    canLoad: [AuthGuard] 
  },

// --- member management end
// =================== volunteer Management start ===================
{ 
  path: 'volunteer-list',
  loadChildren: './pages/volunteer_management/volunteer-list/volunteer-list.module#VolunteerListPageModule',
  canLoad: [AuthGuard]
 },
 { path: 'add-volunteer/:action/:id',
   loadChildren: './pages/volunteer_management/add-volunteer/add-volunteer.module#AddVolunteerPageModule',
   canLoad: [AuthGuard]
 },

 // --- volunteer management end
// =================== Order Management start ===================
  // Order List
  { 
    path: 'order', 
    loadChildren: './pages/order_management/order-list/order-list.module#OrderListPageModule',
    canLoad: [AuthGuard] 
  },
  // add-order
  { 
    path: 'add-order/:action/:id',
    loadChildren: './pages/order_management/add-order/add-order.module#AddOrderPageModule',
    canLoad: [AuthGuard] 
  },

// --- Order management end
// ================== Feed Management start ============
  // Feed count list
  { 
    path: 'feed-count-list',
    loadChildren: './pages/feed_management/feed-count-list/feed-count-list.module#FeedCountListPageModule',
    canLoad: [AuthGuard]
  },
  { 
    path: 'add-feed-count/:action/:id',
    loadChildren: './pages/feed_management/add-feed-count/add-feed-count.module#AddFeedCountPageModule',
    canLoad: [AuthGuard]
  },

// -------- Feed Management end
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// RouterModule.forRoot(routes, { useHash: true })