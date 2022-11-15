import { Component, OnInit,ViewChild } from '@angular/core';

import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})

export class PresentationComponent implements OnInit {
  images = ["../../../../assets/Images/WhatsApp Image 2022-11-09 at 1.25.59 PM.jpeg", "../../../../assets/Images/WhatsApp Image 2022-11-09 at 1.27.15 PM.jpeg", "../../../../assets/Images/WhatsApp Image 2022-11-09 at 1.30.49 PM.jpeg","../../../../assets/Images/WhatsApp Image 2022-11-09 at 1.32.57 PM.jpeg"]
  images2 = ["../../../../assets/Images/bonnie-kittle-GiIZSko7Guk-unsplash.jpg", "../../../../assets/Images/christin-hume-Hcfwew744z4-unsplash.jpg", "../../../../assets/Images/pascal-meier-UYiesSO4FiM-unsplash.jpg","../../../../assets/Images/WhatsApp Image 2022-11-09 at 1.32.57 PM.jpeg"]

  texto=["① Realiza tu pedido","② Espera que acepten tu pedido","③ Realiza el pago de tu pedido","④ Recibe tu pedido"];
  texto2=["① Acepta un pedido","② Espera que paguen el pedido","③ Realiza el viaje de tus sueños","④ Entrega el pedido"];

	

	@ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

	togglePaused() {
		
	}

	onSlide(slideEvent: NgbSlideEvent) {
		
	}
  ngOnInit(): void {
  }

}
