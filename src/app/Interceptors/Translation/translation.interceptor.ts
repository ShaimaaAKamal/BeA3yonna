import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TranslationCacheService } from '../../Services/TranslationCacheService/translation-cache.service';

@Injectable()

export class TranslationCacheInterceptor implements HttpInterceptor {
  constructor(private cacheService: TranslationCacheService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('translate.googleapis.com/translate_a/single')) {
      const cachedResponse = this.cacheService.getCache(req.url);

      if (cachedResponse) {
        return of(new HttpResponse({ body: cachedResponse }));
      }

      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cacheService.setCache(req.url, event.body);
          }
        })
      );
    }

    return next.handle(req);
  }
}