import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent {
  postsArray: any;

  constructor(private postServices: PostService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.postServices.loadData().subscribe((val) => {
      console.log(val);
      this.postsArray = val;
    });
  }

  onDelete(postImgPath: any, id: any) {
    this.postServices.deleteImage(postImgPath, id);
  }
  onFeatured(id:any,value:any){
    const featuredData = {
      isFeatured : value,

    }

    this.postServices.markFeatured(id,featuredData);
  }


}
