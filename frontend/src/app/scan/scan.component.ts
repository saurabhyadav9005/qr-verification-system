import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [ZXingScannerModule],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss'
})
export class ScanComponent {

  constructor(private router: Router) {}

  onScan(result: string) {
    console.log('Scanned QR:', result);

    // Example QR content:
    // http://localhost:4200/verify/UUID_TOKEN
    window.location.href = result;

    // OR safer Angular routing (recommended)
    // const token = result.split('/verify/')[1];
    // this.router.navigate(['/verify', token]);
  }
}
