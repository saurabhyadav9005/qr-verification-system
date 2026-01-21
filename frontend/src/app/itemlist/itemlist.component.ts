import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QrRecord, QrService } from '../service/qr.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-itemlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itemlist.component.html',
  styleUrl: './itemlist.component.scss'
})
export class ItemlistComponent {
  records: QrRecord[] = [];
  loading = false;
  error = '';
  qrImages: { [key: number]: string } = {};

  constructor(private qrService: QrService) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  async loadQrImages() {
    for (let r of this.records) {
      this.qrImages[r.id] = await this.getQrImage(r.qr_token);
    }
  }

  loadRecords() {
    this.loading = true;
    this.qrService.getRecords().subscribe({
      next: (data) => {
        this.records = data;
        this.loadQrImages();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load data';
        this.loading = false;
      }
    });
  }

  delete(data:any) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.qrService.deleteRecord(data.id).subscribe({
      next: () => {
        this.records = this.records.filter(r => r.id !== data.id);
      },
      error: () => alert('Delete failed')
    });
  }

  getQrImage(token: string): Promise<string> {
    const url = `http://localhost:4200/verify/${token}`;
    return QRCode.toDataURL(url);
  }
}
