import { Component, OnDestroy, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseDTO, Course } from "@app/services/course-info";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Subscription, Observable } from "rxjs";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  isAdmin: boolean = false;
  allCourses$: Observable<CourseDTO[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private userStoreService: UserStoreService,
    private coursesFacade: CoursesStateFacade
  ) {
    this.allCourses$ = this.coursesFacade.allCourses$;
    this.isLoading$ = this.coursesFacade.isAllCoursesLoading$;
    this.error$ = this.coursesFacade.errorMessage$;
  }

  ngOnInit() {
    this.coursesFacade.getAllCourses();

    const adminSubscription = this.userStoreService.isAdmin$.subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      },
      (error) => {
        console.error("Failed to determine admin status", error);
      }
    );

    this.subscriptions.add(adminSubscription);
  }
  filterCourses(event: any) {
    this.coursesFacade.getFilteredCourses(event);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
