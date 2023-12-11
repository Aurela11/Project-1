import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AurelaService {
  private apiKey = '24fec29301dd6e2e338aea95b6f6fcb2'; 

  constructor(private http: HttpClient) {}

  getImages(page: number): Observable<any> {
    const perPage = 20; 
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${this.apiKey}&format=json&nojsoncallback=1&per_page=${perPage}&page=${page}`;

    return this.http.get<any>(apiUrl);
  }

  searchImages(search: string, page: number): Observable<any> {
    const perPage = 20; 
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&format=json&text=${search}&nojsoncallback=1&per_page=${perPage}&page=${page}`;
    return this.http.get(apiUrl);
  }

  getImagesByTag(tag: string, page: number): Observable<any> {
    const perPage = 20; 
    const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&format=json&tags=${tag}&nojsoncallback=1&per_page=${perPage}&page=${page}`;
    return this.http.get(apiUrl);
  }
  getHighResPhotoUrl(photo: any): string {
		// Përcakto adresën e fotos në rezolutë të lartë
		return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
	}

  getPhotoById(imageId: string) {
		const api_key = 'cd1d3b7baeecf7e397a88979f043a918';
		const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo';
		const params = `api_key=${api_key}&photo_id=${imageId}&format=json&nojsoncallback=1`;

		return this.http.get<any>(`${url}&${params}`);
	}
 
}
