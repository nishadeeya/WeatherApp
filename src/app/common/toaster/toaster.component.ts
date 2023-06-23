import { Component,Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class ToasterComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) { }

  ngOnInit() {
  }

}
