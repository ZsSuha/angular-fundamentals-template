import { Component, Input, Output, EventEmitter } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mock';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: string;
  @Input() duration!: number;
  @Input() authors!: string[];
  @Input() editable: boolean = true;

  @Output() clickOnShow = new EventEmitter<void>();

  convertDurationToHours(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')} hours`;
  }
  
  getAuthorNames(authorIds: string[]): string {
    return authorIds
      .map(authorId => {
        const author = mockedAuthorsList.find(a => a.id === authorId);
        return author ? author.name : 'Unknown Author';
      })
      .join(', ');
  }

  formatDate(dateString: string): string {
    const dateParts = dateString.split('/');
    const [month, day, year] = dateParts;
    return `${day}.${month}.${year}`; 
  }

  showCourse() {
    this.clickOnShow.emit();
  }
}
