// import { Component } from "@angular/core";
// import { Router } from "@angular/router";
// import {ApiService, Store} from "../../bll/store";
//
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   standalone: true,
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {
//   constructor(private router: Router, private apiService: ApiService) {}
//
//   isRegistered(): boolean {
//     return this.apiService.getCurrentUser() !== undefined && this.apiService.getCurrentUsername() !== null;
//   }
//
//   logOut(): void {
//     this.store.logoutUser().subscribe(
//         (response: any) => {
//           // Выполнить действия после успешного выхода, например, перенаправление на страницу входа
//           this.router.navigate(['/login']);
//         },
//         (error: any) => {
//           // Обработка ошибки выхода
//           console.error('Ошибка при выходе:', error);
//         }
//     );
//   }
// }
