import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-speech-dialog',
  templateUrl: './speech-dialog.component.html',
  styleUrls: ['./speech-dialog.component.scss']
})
export class SpeechDialogComponent implements OnInit {

  public formattedText: string

  constructor(
    public dialogRef: MatDialogRef<SpeechDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formattedText = `<p>${this.data.rohtext[0].replace(/(?:\r\n|\r|\n)/g, '</p><p>')}</p>`;
  }

  ngOnInit() {
  }
}
