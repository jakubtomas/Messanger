import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  isEmpty: boolean;

  martBGcolor = '#ebeff2';
  martBorderRadius = 10;
  showHeader = true;
  showFooter = true;
  martEmojiFontSize = 150;
  x1 = 0;
  x3 = 40;
  y1 = 0;
  text: string;
  firstPick: boolean;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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

  onSubmit(): void {
    if (this.text === 'Pick an emoji 😉' || this.text === '') {
      this.dialogRef.close();
    } else {
      this.dialogRef.close(this.text);
    }
  }
}
