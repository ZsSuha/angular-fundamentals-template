import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
  debounceTime
} from 'rxjs';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  charactersResults$!: Observable<any>;
  planetAndCharactersResults$!: Observable<any>;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  // 1.1. Add functionality to changeCharactersInput method. Changes searchTermByCharacters Subject value on input change.
  changeCharactersInput(element: any): void {
    const inputValue: string = element.target.value;
    this.searchTermByCharacters.next(inputValue);
  }

  // 1.2. Add API call on each user input. Use mockDataService.getCharacters - to make get request.
  // 2. Since we don't want to spam our service add filter by input value and do not call API until a user enters at least 3 chars.
  // 3. Add debounce to prevent API calls until user stop typing.
  initCharacterEvents(): void {
    this.charactersResults$ = this.searchTermByCharacters
        .pipe(
          filter((searchTerm) => searchTerm.length >= 3),
          debounceTime(1000),
          switchMap((searchTerm: string) => this.mockDataService.getCharacters(searchTerm))
        );
  }

  // 4. On clicking the button 'Load Characters And Planets', it is necessary to process two requests and combine the results of both requests into one result array. As a result, a list with the names of the characters and the names of the planets is displayed on the screen.
  loadCharactersAndPlanet(): void {
    this.planetAndCharactersResults$ = forkJoin({
        characters: this.mockDataService.getCharacters(),
        planets: this.mockDataService.getPlanets()})
          .pipe(
              map(({ characters, planets }) => [...characters, ...planets])
          );
  }

  /* 5.1. Let's add loader logic to our page. For each request, we have an observable that contains the state of the request. When we send a request the value is true, when the request is completed, the value becomes false. You can get value data with mockDataService.getCharactersLoader() and mockDataService.getPlanetLoader().

    - Combine the value of each of the streams.
    - Subscribe to changes
    - Check the received value using the areAllValuesTrue function and pass them to the isLoading variable. */
  initLoadingState(): void {
    const charactersLoader$ = this.mockDataService.getCharactersLoader();
    const planetsLoader$ = this.mockDataService.getPlanetLoader();

    combineLatest([charactersLoader$, planetsLoader$])
      .subscribe(
        ([charactersLoading, planetsLoading]) => {
            this.isLoading = this.areAllValuesTrue([charactersLoading, planetsLoading]);
        }
      );
  }

  // 5.2 Unsubscribe from all subscriptions
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
