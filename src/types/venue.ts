export interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  amenities: string[];
  rating: number;
  reviews_count: number;
  owner_id: number;
  owner: {
    name: string;
    email: string;
  };
  courts: Court[];
  created_at: string;
  updated_at: string;
}

export interface Court {
  id: number;
  venue_id: number;
  name: string;
  sport_type: string;
  description: string;
  price_per_hour: number;
  images: string[];
  amenities: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VenueFilters {
  latitude?: number;
  longitude?: number;
  radius?: number;
  sport_id?: number;
  search?: string;
  amenities?: string[];
  sort_by?: string;
  sort_order?: string;
  per_page?: number;
}

export interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  price: number;
  is_available: boolean;
  is_booked: boolean;
}

export interface CourtAvailability {
  court_id: number;
  date: string;
  time_slots: TimeSlot[];
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
