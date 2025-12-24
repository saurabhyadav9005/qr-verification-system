import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrService } from '../service/qr.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
  result: any;

  constructor(
    private route: ActivatedRoute,
    private qrService: QrService
  ) {
    const token = this.route.snapshot.paramMap.get('token');
    this.qrService.verifyQR(token).subscribe(res => this.result = res);
    console.log("result", this.result)
  }
}
