import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  retrieveResponse: any;
  imageName: string = "snek eating";
  base64Data: any;
  retrievedImage: any;

  ngOnInit(): void {
  }

  public slides = [
    { name: "Mick", src: "https://media.istockphoto.com/photos/rocky-mountain-state-park-lake-reflections-picture-id1294369392?b=1&k=20&m=1294369392&s=170667a&w=0&h=_bYBRAK8PzK9NFNNudpa0bmjANUVKEA7x07was0GZz0=" },
    { name: "Johnny", src: "https://media.istockphoto.com/photos/snowcapped-k2-peak-picture-id1288385045?b=1&k=20&m=1288385045&s=170667a&w=0&h=3M3ZRl1bxOGxcvmYZ-TOtuJ3idm0psm4c7GFba1TA5g=" },
    { name: "P.Diddy", src: "https://media.istockphoto.com/photos/mount-fitz-roy-with-laguna-de-los-tres-and-laguna-sucia-patagonia-picture-id1308246314?b=1&k=20&m=1308246314&s=170667a&w=0&h=6ZtwcQfB4y1Ik3fce71pTNYsFav0eSXOZuFh8jhdm2k=" }
  ];

    //Gets called when the user clicks on retieve image button to get the image from back end
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/halloween/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

}
