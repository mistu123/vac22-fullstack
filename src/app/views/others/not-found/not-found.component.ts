import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  options: AnimationOptions = {
    path: 'https://assets1.lottiefiles.com/packages/lf20_lkcv3xga.json',
    // path: 'https://assets4.lottiefiles.com/private_files/lf30_emulvclw.json',
    loop: true,
    renderer: 'svg',
  };

  constructor() {}

  ngOnInit(): void {}
}
