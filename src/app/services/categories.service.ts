import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: AngularFirestore, private taostr: ToastrService) {}

  saveData(data: Category) {
    this.afs
      .collection('categories')
      .add(data)
      .then((docRef) => {
        console.log(docRef);
        this.taostr.success('Data Insert Successfully...!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  loadData() {
    return this.afs
      .collection('categories')
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
  updateData(id:any,editData:any){

    this.afs.doc('categories/'+id).update(editData).then(doc=>{
      this.taostr.success('Data Updated Successfully...!')
    })
    // this.afs.collection('categories').doc(id).update(editData).then(doc=>{
    //   this.taostr.success('Data Updated Successfully...!')
    // })

  }

  daleteDate(id:any){
    this.afs.collection('categories').doc(id).delete().then(docRef =>{
      this.taostr.error('Delete Data Successfully...!');
    })

  }
}

// this.afs
//   .collection('categories')
//   .add(categoryData)
//   .then((docRef) => {
//     console.log(docRef);
//     // this.afs
//     //   .doc(`categories/${docRef.id}`)
//     //   .collection('subcategory')
//     //   .add(subCategoryData);
//     this.afs
//       .collection('categories')
//       .doc(docRef.id)
//       .collection('subcategories')
//       .add(subCategoryData)
//       .then((docRef1) => {
//         console.log(docRef1);
//         // this.afs
//         //   .doc(`categories/${docRef.id}/subcategories/${docRef1.id}`)
//         //   .collection('subsubcategories')
//         //   .add(subCategoryData);

//         this.afs
//           .collection('categories')
//           .doc(docRef.id)
//           .collection('subcategories')
//           .doc(docRef1.id)
//           .collection('subsubcategories')
//           .add(subCategoryData)
//           .then((docRef2) => {
//             console.log('second Level Subcategory Saved Successfully');
//           });
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
