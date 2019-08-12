import { Component, OnInit, OnDestroy } from '@angular/core'

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth-service';
import { Subscription } from 'rxjs';

@Component ({
    selector: 'header-component',
    templateUrl: './header.component.html',
    
})

export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;

    collapsed = true;

    constructor(private dataService: DataStorageService, private authService: AuthService) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user
        });
    }

    saveData() {
        this.dataService.storeRecipes();
    }

    onFetchData() {
        this.dataService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}