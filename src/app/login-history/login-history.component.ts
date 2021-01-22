import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import {ItemHistory} from '../entities/itemHistory';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
    selector: 'app-loginHistory',
    templateUrl: './login-history.component.html',
    styleUrls: ['./login-history.component.css']
})
export class LoginHistoryComponent implements OnInit, AfterViewInit {

  logDataSource = new MatTableDataSource<ItemHistory>();
  columns = ['datetime', 'type', 'login'];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getLoginHistory().subscribe(loginHistory => {
      this.logDataSource.data = loginHistory;
    });
  }

  ngAfterViewInit(): void {
    this.logDataSource.paginator = this.paginator;
    this.logDataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.logDataSource.filter = filterValue.trim().toLowerCase();

    if (this.logDataSource.paginator) {
      this.logDataSource.paginator.firstPage();
    }
  }
}
