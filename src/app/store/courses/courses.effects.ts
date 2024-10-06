import { Injectable } from "@angular/core";
import { CoursesService } from "@app/services/courses.service";
import { Course, CourseDTO, Author } from "@app/services/course-info";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  requestAllCourses,
  requestAllCoursesFail,
  requestAllCoursesSuccess,
  requestCreateCourse,
  requestCreateCourseFail,
  requestCreateCourseSuccess,
  requestDeleteCourse,
  requestDeleteCourseFail,
  requestDeleteCourseSuccess,
  requestEditCourse,
  requestEditCourseFail,
  requestEditCourseSuccess,
  requestFilteredCourses,
  requestFilteredCoursesFail,
  requestFilteredCoursesSuccess,
  requestSingleCourse,
  requestSingleCourseFail,
  requestSingleCourseSuccess,
} from "./courses.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { Router } from "@angular/router";

// Utility function to convert CourseDTO to Course
const convertDTOToCourse = (courseDTO: CourseDTO): Course => ({
    ...courseDTO,
    authors: courseDTO.authors?.map((author: Author) => author.id || '') || [] // Convert Author[] to string[] (author ids)
  });

@Injectable()
export class CoursesEffects {
  
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) => requestAllCoursesSuccess({ courses })), // Correct: Pass an object with `courses`
          catchError((error) => of(requestAllCoursesFail({ error })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestFilteredCourses),
      mergeMap((action) =>
        this.coursesService.filterCourses({ title: action.title }).pipe(
          map((courses) => requestFilteredCoursesSuccess({ courses })), // Fix: Wrap `courses` in an object
          catchError((error) => of(requestFilteredCoursesFail({ error })))
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((course) => requestSingleCourseSuccess({ course })), // Correct payload shape
          catchError((error) => of(requestSingleCourseFail({ error })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => requestDeleteCourseSuccess({ id: action.id })), // Pass the ID inside an object
          catchError((error) => of(requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((courseDTO: CourseDTO) => requestEditCourseSuccess({ course: convertDTOToCourse(courseDTO) })),
          catchError((error) => of(requestEditCourseFail({ error })))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((course) => requestCreateCourseSuccess({ course })),
          catchError((error) => of(requestCreateCourseFail({ error })))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          requestCreateCourseSuccess,
          requestEditCourseSuccess,
          requestSingleCourseFail
        ),
        tap(() => this.router.navigate(["/courses"]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router
  ) {}
}