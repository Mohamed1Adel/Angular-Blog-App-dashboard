import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  permalink: any = '';
  imgSrc: any = './assets/600x400.png';
  selectedImage: any;

  categories: any;

  postForm: any;

  post: any;

  formStatus: any = 'Add New';

  docId: any;

  constructor(
    private categoryServices: CategoriesService,
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val) => {
      this.docId = val['id'];
      console.log(val);
      if (this.docId) {
        this.postService.loadOnedata(val['id']).subscribe((post) => {
          this.post = post;
          this.postForm = this.fb.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(10)],
            ],
            permalink: [this.post.permalink, Validators.required],
            excerpt: [
              this.post.excerpt,
              [Validators.required, Validators.minLength(50)],
            ],
            category: [
              `${this.post.category.categoryId}-${this.post.category.category}`,
              Validators.required,
            ],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });

          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        });
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          excerpt: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
    });

    // this.postForm = this.fb.group({
    //   title: ['', [Validators.required, Validators.minLength(10)]],
    //   permalink: ['', Validators.required],
    //   excerpt: ['', [Validators.required, Validators.minLength(50)]],
    //   category: ['', Validators.required],
    //   postImg: ['', Validators.required],
    //   content: ['', Validators.required],
    // });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoryServices.loadData().subscribe((val) => {
      this.categories = val;
    });
  }
  get fc() {
    return this.postForm.controls;
  }
  onTitleChange(e: any) {
    // console.log(e.target.value)
    const title = e.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }
  showPreview(e: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL(e.target.files[0]);
    this.selectedImage = e.target.files[0];
    console.log(e.target.files[0]);
  }

  onSubmit() {
    console.log(this.postForm.value);
    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    this.postService.uploadImage(
      this.selectedImage,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();

    this.imgSrc = './assets/600x400.png';
  }


}
