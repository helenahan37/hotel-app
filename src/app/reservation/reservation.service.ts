import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  //get all reservations
  getReservations(): Reservation[] {
    return this.reservations;
  }

  //get reservation by id
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }

  //add new reservation
  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  //delete reservation by id
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations.splice(index, 1);
  }

  //update reservation by id
  updateReservation(updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(
      (res) => res.id === updatedReservation.id
    );
    this.reservations[index] = updatedReservation;
  }
}
