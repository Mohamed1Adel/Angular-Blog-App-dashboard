import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(selectedImage: any, postData: any, formStatus: any, id: any) {
    const filePath = `postImg/${Date.now()}`;
    console.log();
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image uploaded sccessfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          console.log(postData);
          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Date Inset Successfully');
        this.router.navigate(['/posts']);
      });
  }

  loadData() {
    return this.afs
      .collection('posts')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  loadOnedata(id: any) {
    return this.afs.collection('posts').doc(id).valueChanges();
  }
  updateData(id: any, postData: any) {
    this.afs
      .collection('posts')
      .doc(id)
      .update(postData)
      .then(() => {
        this.toastr.success('Data Updated Successfully !');
        this.router.navigate(['/posts']);
      });
  }

  deleteImage(postImgPath:any,id:any){
    this.storage.storage.refFromURL(postImgPath).delete().then(()=>{
      this.deleteData(id)
    })
  }
  deleteData(id:any){
    this.afs.collection('posts').doc(id).delete().then(()=>{
      this.toastr.warning('Data Deleted ...!')
    })
  }

  markFeatured(id:any,featuredData:any){

    this.afs.doc(`posts/${id}`).update(featuredData).then(()=>{
      this.toastr.info('featured Status Updated')
    })
  }
}
