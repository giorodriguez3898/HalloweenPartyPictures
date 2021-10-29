import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  retrieveResponse: any;
  imageName: string = "eating.jpg";
  base64Data: any;
  retrievedImage: any = null;
  public currentImage = 0;
  public database_populated: boolean = false;
  public nameList: any;
  totalImages: any;

  ngOnInit(): void {
    //this.checkCount();
    //this.cycle();
    this.httpClient.get('http://localhost:8080/halloween/check')
    .subscribe(
      res => {
        if (res > 0)
        {
          console.log("check count is true")
          this.database_populated = true;
        }

        if (this.database_populated){
          console.log("yes cycle")
          this.cycle();
        }
        else {
          console.log("no cycle")
        }
      }
    );
  }


  public imageNames: Array<string> = [];

  public slides = [
    { name: "Mick", src: "https://media.istockphoto.com/photos/rocky-mountain-state-park-lake-reflections-picture-id1294369392?b=1&k=20&m=1294369392&s=170667a&w=0&h=_bYBRAK8PzK9NFNNudpa0bmjANUVKEA7x07was0GZz0="},
    { name: "Johnny", src: "https://media.istockphoto.com/photos/snowcapped-k2-peak-picture-id1288385045?b=1&k=20&m=1288385045&s=170667a&w=0&h=3M3ZRl1bxOGxcvmYZ-TOtuJ3idm0psm4c7GFba1TA5g=" },
    { name: "P.Diddy", src: "https://media.istockphoto.com/photos/mount-fitz-roy-with-laguna-de-los-tres-and-laguna-sucia-patagonia-picture-id1308246314?b=1&k=20&m=1308246314&s=170667a&w=0&h=6ZtwcQfB4y1Ik3fce71pTNYsFav0eSXOZuFh8jhdm2k=" }
  ];

  sleep(ms) {
       return new Promise(resolve => setTimeout(resolve, ms));
    }


  cycle(){

    interval(20000).subscribe(x => { 

      this.updateCount();
      console.log("executing update count")
      this.sleep(10000)
      console.log("executing update names list")
      this.updateNamesList()
      this.sleep(10000)
      if (this.currentImage == this.totalImages){
        this.currentImage = this.currentImage % this.totalImages;
        console.log("mod used")
        console.log(this.currentImage)
      }
      else
      {
        console.log("mod not used")
        this.currentImage = this.currentImage + 1;
        console.log("check 1")
        this.imageName = this.nameList[this.currentImage - 1]
        console.log(this.nameList)
        console.log("check 2")
        this.getImage()
      }
      //this.getImage();
    });
  }

  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    console.log("getting image")
    this.httpClient.get('http://localhost:8080/halloween/get/' + this.imageName)
      .subscribe(
        res => {
          console.log("in subscribe")
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );

      //this.slides.push({name: "tester", src: this.retrievedImage})
  }

  updateNamesList(){
    this.httpClient.get('http://localhost:8080/halloween/allnames')
      .subscribe(
        res => {
          console.log("printing update names list")
          this.nameList = res;
          console.log(res)
        }
      );
  }


  updateCount(){
    console.log("inside update count")
     this.httpClient.get('http://localhost:8080/halloween/check')
      .subscribe(
        res => {
          this.totalImages = res;
          console.log("new count is: ")
          console.log(this.totalImages)
        }

      );
  }
  checkCount(){
    this.httpClient.get('http://localhost:8080/halloween/check')
      .subscribe(
        res => {
          if (res > 0)
          {
            console.log("check count is true")
            this.database_populated = true;
          }
        }
      );
  }

}
