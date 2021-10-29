import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ImagingService } from '../../services/imaging.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  constructor(private httpClient: HttpClient, private imageService: ImagingService) { }

  retrieveResponse: any;
  public namesList: any;
  imageName: string = "eating.jpg";
  base64Data: any;
  retrievedImage: any = null;
  currentImage = 0;
  public database_populated: boolean = false;
  totalImages: any;

  ngOnInit(): void {

    // this.imageService.checkCount().subscribe(count => {
    //   if (count > 0){
    //     this.database_populated = true;
    //     console.log("images in the database")
    //     this.cycle()
    //   }
    //   else 
    //   {
    //     console.log("no images in the database")
    //   }
    // })
    this.checkCount().then(count => {
      if (count > 0 ) {
        this.database_populated = true
        console.log("database is populated. going to cycle")
        this.cycle()
      }
      else {
        this.database_populated = false;
      }
    })
    // count.then(data => {
    //   console.log("inside promise")
    //   console.log(data)
    // })

    //this.cycle();
    // this.httpClient.get('http://localhost:8080/halloween/check')
    // .subscribe(
    //   res => {
    //     if (res > 0)
    //     {
    //       console.log("check count is true")
    //       this.database_populated = true;
    //     }

    //     if (this.database_populated){
    //       console.log("yes cycle")
    //       this.cycle();
    //     }
    //     else {
    //       console.log("no cycle")
    //     }
    //   }
    // );
  }


  public imageNames: Array<string> = [];

  public slides = [
    { name: "Mick", src: "https://media.istockphoto.com/photos/rocky-mountain-state-park-lake-reflections-picture-id1294369392?b=1&k=20&m=1294369392&s=170667a&w=0&h=_bYBRAK8PzK9NFNNudpa0bmjANUVKEA7x07was0GZz0="},
    { name: "Johnny", src: "https://media.istockphoto.com/photos/snowcapped-k2-peak-picture-id1288385045?b=1&k=20&m=1288385045&s=170667a&w=0&h=3M3ZRl1bxOGxcvmYZ-TOtuJ3idm0psm4c7GFba1TA5g=" },
    { name: "P.Diddy", src: "https://media.istockphoto.com/photos/mount-fitz-roy-with-laguna-de-los-tres-and-laguna-sucia-patagonia-picture-id1308246314?b=1&k=20&m=1308246314&s=170667a&w=0&h=6ZtwcQfB4y1Ik3fce71pTNYsFav0eSXOZuFh8jhdm2k=" }
  ];


  cycle(){

    interval(10000).subscribe(x => 
    { 

      // checking total image count
      // this.imageService.checkCount().subscribe(data => {
      //   this.totalImages = data;
      // })
      // let data = this.checkCount()
      // console.log("printing total images")
      // console.log(data)
      this.checkCount().then(data => {
        this.totalImages = data
        console.log("first print update count")
      })
      console.log("2nd print update count")

      // updated all names in database

      //this.updateCount();
      /* update count of total images*/
      // this.httpClient.get('http://localhost:8080/halloween/check')
      // .subscribe(
      //   res => {
      //     this.totalImages = res;
      //     console.log("new count is: ")
      //     console.log(this.totalImages)
      //   }

      // );
      /* end of update count */



      /*update all names in database */
      // this.imageService.updateNamesList().subscribe( data => {
      //   this.namesList = data;
      // })
      // let moredata = this.updateNamesList()
      // console.log("printing namesList")
      // console.log(moredata)
      this.updateNamesList().then(nameList => {
        this.namesList = nameList;
        console.log("print 1 name list")
      })
      console.log("print 2 name list")

      // this.httpClient.get('http://localhost:8080/halloween/allnames')
      // .subscribe(
      //   res => {
      //     console.log("printing update names list")
      //     console.log(res)
      //     this.namesList = res;
      //   }
      // );
      /* end of update all names */


      // if (this.currentImage == this.totalImages)
      // {

      // }
      // else
      // {
      //   this.httpClient.get('http://localhost:8080/halloween/allnames')
      //   .subscribe
      //   ( res => 
      //     {
      //       console.log("printing update names list")
      //       console.log(res)
      //     }
      //   );
      //   //this.imageName = 
      // }
      //this.getImage();
      console.log("logging boolean")
      console.log(this.database_populated)
    });
  }

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

      //this.slides.push({name: "tester", src: this.retrievedImage})
  }

  async updateNamesList(){
    // this.httpClient.get('http://localhost:8080/halloween/allnames')
    //   .subscribe(
    //     res => {
    //       console.log("printing update names list")
    //       console.log(res)
    //     }
    //   );
    return await this.imageService.updateNamesList()
  }


  updateCount(){
    //  this.httpClient.get('http://localhost:8080/halloween/check')
    //   .subscribe(
    //     res => {
    //       this.totalImages = res;
    //       console.log("new count is: ")
    //       console.log(this.totalImages)
    //     }

    //   );
  }
  async checkCount(){
    console.log("inside checkcount")
    // this.httpClient.get('http://localhost:8080/halloween/check')
    //   .subscribe(
    //     res => {
    //       if (res > 0)
    //       {
    //         console.log("check count is true")
    //         this.database_populated = true;
    //       }
    //     }
    //   );
    return await this.imageService.checkCount()
  }

}
