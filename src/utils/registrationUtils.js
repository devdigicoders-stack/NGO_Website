// d:\Desktop\NGO\website_ngo\src\utils\registrationUtils.js

const API_BASE = import.meta.env.VITE_API_BASE;

// ID card template mapping
export const getIDCardTemplate = (orgId) => {
  const templates = {
    patrakar: '/ID/press.png',
    crime: '/ID/crime.png',
    chikitsa: '/ID/akhil.png',
    hindu: '/ID/hindu.png',
    journalist: '/ID/indian_council.png',
    manav: '/ID/sadhu.png',
    bhrashtachar: '/ID/bhrast.png',
    recall: '/ID/right.png',
    muslim: '/ID/mushlim.png'
  }
  
  return templates[orgId] || '/ID/press.png'
}

// Save registration data to MongoDB via backend API
export const saveRegistration = async (orgId, formData) => {
  try {
    const res = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orgId, formData }),
    });
    
    const json = await res.json();
    if (json.success) {
      return { success: true, data: json.data };
    } else {
      console.error('Failed to save registration:', json.message);
      return { success: false, error: json.message };
    }
  } catch (err) {
    console.error('Error saving registration:', err);
    return { success: false, error: 'Cannot connect to server' };
  }
}

// Get registration by number from MongoDB via backend API
export const getRegistration = async (regNumber) => {
  try {
    // encodeURIComponent is safe for slashes in regNumber
    const res = await fetch(`${API_BASE}/registrations/${encodeURIComponent(regNumber)}`);
    const json = await res.json();
    if (json.success) {
      return json.data;
    } else {
      console.error('Registration not found:', json.message);
      return null;
    }
  } catch (err) {
    console.error('Error fetching registration:', err);
    return null;
  }
}
