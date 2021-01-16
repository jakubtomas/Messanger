import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isEmpty: boolean;

  martBGcolor = '#ebeff2';
  martHeaderBG = '#e3e7e8';
  martFooterBG = '#e3e7e8';
  martActiveCategoryIndicatorColor = '#00897b';
  martCategoryColor = '#94a0a6';
  martCategoryColorActive = '#455a64';
  martBorderRadius = 10;
  showHeader = true;
  showFooter = true;
  martActiveCategoryIndicatorHeight = 4;
  martEmojiFontSize = 150;
  martCategoryFontSize = 20;

  x1 = 0;
  x2 = 0;
  x3 = 40;
  y1 = 0;
  y2 = 0;
  y3 = 40;

  text: string;
  firstPick: boolean;

  constructor(private dialog: MatDialog) {
    this.firstPick = false;
    this.text = 'Pick an emoji 😉';
    this.isEmpty = true;
  }

  ngOnInit(): void {}

  handleEmoji(e): void {
    if (this.isEmpty) {
      this.isEmpty = false;
      this.text = '';
    }
    if (!this.firstPick) {
      this.text = '';
      this.firstPick = true;
    }
    this.text += e.char;
    console.log('Emoji Name', e.name);
  }

  handleCharDelete(): void {
    if (this.isEmpty) {
      return;
    }
    if (this.text.length > 0) {
      this.text = this.text.substr(0, this.text.length - 2);
      if (this.text.length === 0) {
        this.isEmpty = true;
        this.text = 'Pick a emoji 😉';
      }
    }
  }

  openDialog(): void {
    // this.dialog.open();
  }
}
