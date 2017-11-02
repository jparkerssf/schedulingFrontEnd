/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import {CreateCartComponent } from './create-cart/create-cart.component';
import {LoginComponent } from './login/login.component';
import {DashboardComponent } from './dashboard/dashboard.component';
import {AddCartComponent } from './add-cart/add-cart.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'create-slot', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path:'create', component:CreateCartComponent},
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent},
   {path:'add-cart', component:AddCartComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
