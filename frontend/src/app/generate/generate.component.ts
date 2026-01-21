import { Component } from '@angular/core';
import { QrService } from '../service/qr.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.scss'
})
export class GenerateComponent {
  mainForm!: FormGroup;

  qrImage: string | null = null;
  

  constructor(private qrService: QrService, private formBuilder:FormBuilder) {
    this.initializeForm();
  }

  initializeForm(){
    this.mainForm = this.formBuilder.group({
      name: [''],
      document_no: ['']
    })
  }

  getObjectData(){
    let data = {
      name: this.mainForm.get('name')?.value,
      document_no: this.mainForm.get('document_no')?.value,
    }

    return data;
  }
  generateQR() {
    const data = this.getObjectData();
    this.qrService.generateQR(data).subscribe({
      next: (res: any) => {
        this.qrImage = res.qrImage;
      },
      error: err => {
        console.error(err);
        alert('QR generation failed');
      }
    });
  }
}
