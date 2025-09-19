import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.component.html',
  // styleUrls : ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  stockName = '';
  stockCode = '';
  tagLines = '';
  metalWt = '';
  metalCost = '';
  currencyCode = '';
  categoryCode = '';
  subCategoryCode = '';
  brandCode = '';

  mainImage: string = '../../assets/images/product-main.jpeg';

  thumbnails: string[] = [
    '../../assets/images/product-main.jpeg',
    '../../assets/images/product-main.jpeg'
  ];


  componentDetails: any[] = [];

  constructor(private ApiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token || token !== 'QzY3dnpYQjZrU2ZWRElhTW5rN3F6UXFneDRPdmVoT1A=') {
      this.router.navigate(['/login']);
    } else {
      this.loadProductData();
    }
  }

  loadProductData(): void {
    this.ApiService.getProductData().subscribe(response => {
      if (response.status === 'Success') {
        const stock = response.dynamicData.DiamondStockMaster[0];
        this.stockName = stock.STOCK_DESCRIPTION;
        this.stockCode = stock.STOCK_CODE;
        this.tagLines = stock.TAG_LINES;
        this.metalWt = stock.METAL_TOTALGROSSWT;
        this.metalCost = stock.STD_LCCOST;
        this.currencyCode = stock.CURRENCY_CODE;
        this.categoryCode = stock.CATEGORY_CODE;
        this.subCategoryCode = stock.SUBCATEGORY_CODE;
        this.brandCode = stock.BRAND_CODE;

        this.componentDetails = (response.dynamicData.DiamondStnMtlDetails || []).map((item : any) => {
          const type = item.METALSTONE;
          let component = '';
          let description = '';
          let weight = item.GROSS_WT || item.STONE_WT || item.NET_WT || 0;
          let charges = item.AMOUNTLC || 0;

          if (type === "M") {
            component = "Metal";
            description = `${item.KARAT || '-'}K Gold`;
          } else if (type === "S") {
            component = "Stones";
            description = "White Sapphire";
          } else if (type === "D") {
            component = "Diamond";
            description = `${item.CLARITY || '-'} / ${item.COLOR || '-'}, ${item.CARAT || 0} ct`;
          }

          return {
            component,
            description,
            weight: parseFloat(weight).toFixed(2),
            charges: parseFloat(charges).toLocaleString("en-IN")
          };
        });

      }
    });
  }

  logout(event :any): void {
    event.preventDefault();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  changeImage(event: Event, imageUrl: string): void {
    event.preventDefault();
    this.mainImage = imageUrl;
  }

}
