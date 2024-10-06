import { Inject, Injectable } from "@angular/core";
import { WINDOW } from "@app/app.module";

const TOKEN = 'SESSION_TOKEN'; // Session storage key for token

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string): void {
    const formattedToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    sessionStorage.setItem(TOKEN, formattedToken);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    sessionStorage.removeItem(TOKEN);
  }
}