import { Component, HostListener } from '@angular/core';
import { AurelaService } from '../services/aurela.service';

interface FlickrImageData {
  imageUrl: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  flickrImages: FlickrImageData[] = [];
  currentPage = 1;
  loading = false;
  search: string = '';

 
 

  constructor(private aurelaService: AurelaService) {
    this.fetchImages();
  }

  fetchImages(): void {
    if (!this.loading) {
      this.loading = true;
      this.aurelaService.getImages(this.currentPage).subscribe(
        (data: any) => {
          this.handleFetchedData(data);
          this.loading = false;
        },
        (error: any) => {
          console.error(error);
          this.loading = false;
        }
      );
    }
  }

  handleFetchedData(data: any): void {
    const imagesFromApi: any[] = data.photos.photo;
    const formattedImages: FlickrImageData[] = imagesFromApi.map((image: any) => {
      return {
        imageUrl: `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
      };
    });
    this.flickrImages = [...this.flickrImages, ...formattedImages];
  }

  searchImages(): void {
    this.currentPage = 1;
    this.flickrImages = [];

    if (this.search.length > 0 && !this.loading) {
      this.loading = true;
      this.aurelaService.searchImages(this.search, this.currentPage).subscribe(
        (data: any) => {
          this.handleFetchedData(data);
          this.loading = false;
        },
        (error: any) => {
          console.error(error);
          this.loading = false;
        }
      );
    }
  }

  getImageUrl(imageData: FlickrImageData): string {
    return imageData.imageUrl;
  }
  openHighResPhoto(image: any) {
		this.aurelaService.getPhotoById(image.id).subscribe(data => {
			// Përcakto adresën e fotos së plotë në rezolutë të lartë
			const highResUrl = this.aurelaService.getHighResPhotoUrl(data.image);

			// Hap foto në rezolutë të lartë në një dritare të re
			window.open(highResUrl, '_blank');
		});
	}

  onSearch(): void {
    if (this.search.length > 0) {
      this.searchImages();
    } else {
      this.flickrImages = [];
    }
  }

  

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

    if (windowHeight + scrollPosition >= scrollHeight) {
      if (!this.loading) {
        this.currentPage++;
        if (this.search.length > 0) {
          this.searchImages();
        } else {
          this.fetchImages();
        }
      }
    }
  }
}


