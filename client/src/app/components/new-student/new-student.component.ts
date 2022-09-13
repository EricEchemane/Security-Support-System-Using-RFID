import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student/student.service';
import { TimeInService } from 'src/app/services/time-in/time-in.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.css']
})
export class NewStudentComponent implements OnInit {
  rfidStatus: "untapped" | "used" | "available" = "untapped";
  previousTappedRfid = "";

  constructor(
    private timeInService: TimeInService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.timeInService.onTimeIn().subscribe((data: any) => {
      // prevents rfid spamming
      if (data.uid === this.previousTappedRfid) return;

      this.previousTappedRfid = data.uid;

      // check if rfid is available
      this.studentService.checkIfRfidIsAvailable(data.uid)
        .then(data => {
          if (data.success) this.rfidStatus = "used";
          else this.rfidStatus = "available";
        });
    });
  }
}
