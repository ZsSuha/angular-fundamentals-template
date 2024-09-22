import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      description : this.fb.control('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      author: this.fb.control('', [
        Validators.minLength(2), 
        Validators.pattern('[a-zA-Z0-9]*')
      ]),
      authors: this.fb.array([]),
      duration: this.fb.control(0, [
        Validators.required,
        Validators.min(0)
      ])
    })
  }
  courseForm!: FormGroup;
  nextId = 1;

  onFormSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      this.courseForm.reset();
      this.authors.clear();

    } else {
      alert('Form is not valid');
      this.courseForm.markAllAsTouched(); 
    }
  }
  addAuthor(id: number) {
    console.log(id);
  }
  deleteAuthor(id: number){
    console.log(id);
  }
  createAuthor() {
    const newAuthor = this.courseForm.get('author');
    if (newAuthor?.valid && newAuthor.value.length > 2) {
      const authorFormGroup = this.fb.group({
        id: this.nextId++,
        name: newAuthor.value,
      });
      this.authors.push(authorFormGroup);
      newAuthor.reset();
    }
  }
  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }
}
