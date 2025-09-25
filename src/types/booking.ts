export interface Booking {
  id: number;
  user_id: number;
  venue_id: number;
  court_id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  duration: number;
  total_price: number;
  status: BookingStatus;
  notes?: string;
  payment_status: PaymentStatus;
  payment_method?: string;
  payment_id?: string;
  user: {
    name: string;
    email: string;
    phone?: string;
  };
  venue: {
    name: string;
    address: string;
  };
  court: {
    name: string;
    sport_type: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateBookingData {
  venue_id: number;
  court_id: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  notes?: string;
  payment_method: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface BookingStats {
  total_bookings: number;
  completed_bookings: number;
  cancelled_bookings: number;
  total_revenue: number;
  monthly_revenue: number[];
  popular_courts: {
    court_name: string;
    booking_count: number;
  }[];
}
