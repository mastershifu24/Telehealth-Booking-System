// lib/api.js
export async function fetchAppointments() {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    return data;
  }
  