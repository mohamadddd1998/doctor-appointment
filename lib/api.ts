const API_BASE_URL = "http://localhost:3001";

export interface Appointment {
  date: string;
  time: string;
}

// Appointments API
export const appointmentsApi = {
  // Get all appointments
  getAll: async (): Promise<Appointment[]> => {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    if (!response.ok) {
      throw new Error("خطا در دریافت نوبت‌ها");
    }
    return response.json();
  },

  // Get appointment by ID
  getById: async (id: number): Promise<Appointment> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`);
    if (!response.ok) {
      throw new Error("خطا در دریافت نوبت");
    }
    return response.json();
  },

  // Create new appointment
  create: async (appointment: Appointment): Promise<Appointment> => {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...appointment,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      throw new Error("خطا در ایجاد نوبت");
    }
    return response.json();
  },

  // Update appointment
  update: async (
    id: number,
    appointment: Partial<Appointment>
  ): Promise<Appointment> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });
    if (!response.ok) {
      throw new Error("خطا در بروزرسانی نوبت");
    }
    return response.json();
  },

  // Delete appointment
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("خطا در حذف نوبت");
    }
  },
};
