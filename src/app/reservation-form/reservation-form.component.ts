import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    // get id from the route
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      let reservation = this.reservationService.getReservation(id);

      if (reservation) {
        //populate the form
        this.reservationForm.setValue(reservation);
      }
    }
  }
  onSubmit() {
    //check if the form is valid
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let id = this.route.snapshot.paramMap.get('id');

      if (id) {
        //update the reservation
        this.reservationService.updateReservation(id, reservation);
      } else {
        //create a new reservation
        this.reservationService.addReservation(reservation);
      }

      //navigate to the reservation list
      this.router.navigate(['/list']);
    }
  }
}
