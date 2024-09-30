import { Pipe, PipeTransform } from "@angular/core";
import { Author } from "@app/services/course-info";
@Pipe({
  name: "authorName",
})

export class AuthorNamePipe implements PipeTransform {
  transform(authors: Author[]) {
    if (authors === undefined) {
      return;
    }
    return authors.map((authors) => {
      return authors.name;
    });
  }
}