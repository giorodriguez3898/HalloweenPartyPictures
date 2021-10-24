import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor() { }

  public picturePhrase="";

  ngOnInit(): void {
  }

  confirmSubmission(){

  }

  onClickSubmit(data) {

  }

}
