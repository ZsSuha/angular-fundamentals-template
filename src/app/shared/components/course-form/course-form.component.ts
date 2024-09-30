import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { Author, Course, CourseDTO } from "@app/services/course-info";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  courseId: string | null = null;
  nextId = 1; // Initialize ID counter
  showModal = false;
  modalTitle = "";
  modalMessage = "";

  constructor(
    private fb: FormBuilder,
    private library: FaIconLibrary,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private coursesStoreService: CoursesStoreService
  ) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: this.fb.control("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: this.fb.control("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      author: this.fb.control("", [
        Validators.minLength(2),
        Validators.pattern("[a-zA-Z0-9]*"),
      ]),
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      duration: this.fb.control(0, [Validators.required, Validators.min(1)]),
    });
  }
  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.courseId) {
      this.coursesStoreService.getCourse(this.courseId);
      this.coursesStoreService.selectedCourse$.subscribe((course) => {
        if (course) {
          this.populateForm(course);
        }
      });
    }
  }
  populateForm(course: CourseDTO) {
    this.courseForm.patchValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
    });
    this.setAuthors(course.authors);
  }
  setAuthors(authors: Author[] | undefined) {
    if (authors) {
      const authorFormGroups = authors.map((author) =>
        this.createAuthorFbGroup(author)
      );
      const authorFormArray = this.fb.array(authorFormGroups);
      this.courseForm.setControl("courseAuthors", authorFormArray);
    }
  }
  onFormSubmit() {
    if (this.courseForm.valid) {
      if (this.courseId) {
        this.coursesStoreService.editCourse(
          this.courseId,
          this.createCourseFromForm()
        );
      } else {
        this.coursesStoreService.createCourse(this.createCourseFromForm());
      }
      this.courseForm.reset();
      this.courseAuthors.clear();
      this.router.navigate(["/courses"]);
    } else {
      this.updateModal("Invalid form", "Form is not valid");
      this.courseForm.markAllAsTouched();
    }
  }

  createCourseFromForm(): Course {
    let courseFormValue = this.courseForm.value;
    return {
      title: courseFormValue["title"],
      description: courseFormValue["description"],
      duration: courseFormValue["duration"],
      authors: this.getAuthorsIds(),
    };
  }

  getAuthorsIds(): string[] {
    let ids: string[] = [];
    this.courseAuthors.value.map((author: Author) => ids.push(author.id!));
    return ids;
  }

  addAuthorToCourseAuthors(id: number) {
    let author = this.authors.controls.at(id);
    this.coursesStoreService
      .createAuthor(author?.get("name")?.value)
      .subscribe({
        next: (author) => {
          this.courseAuthors.push(this.createAuthorFbGroup(author));
          this.deleteAuthor(id);
        },
        error: (error) => {
          console.error("Failed to create author:", error);
        },
      });
  }

  createAuthorFbGroup(author: Author) {
    return this.fb.group({
      id: [author.id, Validators.required],
      name: [author.name, Validators.required],
    });
  }
  deleteAuthor(id: number) {
    this.authors.removeAt(id);
  }
  deleteCourseAuthor(id: number) {
    this.courseAuthors.removeAt(id);
  }

  createAuthor() {
    const newAuthor = this.courseForm.get("author");
    if (newAuthor?.valid && newAuthor.value.length >= 2) {
      const authorFormGroup = this.fb.group({
        id: this.nextId++,
        name: newAuthor.value,
      });
      this.authors.push(authorFormGroup);
      newAuthor.reset();
    }
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get("courseAuthors") as FormArray;
  }
  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }

  updateModal(modalTitle: string, modalMessage: string) {
    this.modalMessage = modalTitle;
    this.modalTitle = modalMessage;
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
}
