const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

// Auth API
export const authApi = {
  // login
  login: async (payload: any) => {
    const response = await fetch(`${API_BASE_URL}/SeedData/Login/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("خطا در  ورود");
    }
    return response.json();
  },

  // register
  register: async (payload: any) => {
    const response = await fetch(
      `${API_BASE_URL}/SeedData/CreateAccount/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": " multipart/form-data",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw new Error("خطا در  ثبت نام");
    }
    return response.json();
  },

  // sendd-otp
  sendOtp: async (payload: any) => {
    const response = await fetch(`${API_BASE_URL}/Test/SendOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("خطا در  ارسال کد");
    }
    return response.json();
  },
};
