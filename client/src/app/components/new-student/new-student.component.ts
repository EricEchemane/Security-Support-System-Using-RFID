import { Component, OnInit } from '@angular/core';
import { TimeInService } from 'src/app/services/time-in/time-in.service';

type timeIn = {
  uid: string;
};

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {
  timeIn: timeIn | undefined;

  constructor(private timeInService: TimeInService) { }

  ngOnInit(): void {
    this.timeInService.onTimeIn().subscribe((data: any) => this.timeIn = data);
  }
}
