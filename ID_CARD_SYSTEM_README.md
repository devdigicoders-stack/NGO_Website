# ID Card Generation System - Complete Guide

## 🎯 Features Implemented

### 1. **Unique Registration Number Generation**
Har trust ke liye alag prefix ke saath unique registration number:
- **RPS** - Rashtriya Patrakar Samarpan Sangh
- **RCIB** - Rashtriya Crime Investigation Bureau
- **ABCS** - Akhil Bhartiya Chikitsa Sangh
- **RHM** - Rashtriya Hindu Mahasabha
- **ICJ** - Indian Council of Journalist
- **RMA** - Rashtriya Manavadhikar Aayog
- **BUAC** - Bhrashtachar Unmoolon Apradh Anusandhan Kendra
- **RTR** - Right To Recall
- **BMM** - Bhartiya Muslim Manch

Format: `PREFIX/YEAR/RANDOM6DIGIT`
Example: `RPS/2025/456789`

### 2. **ID Card Templates Mapping**
Har organization ke liye specific ID card template:
- `patrakar` → `/ID/press.png`
- `crime` → `/ID/crime.png`
- `chikitsa` → `/ID/akhil.png`
- `hindu` → `/ID/hindu.png`
- `journalist` → `/ID/indian_council.png`
- `manav` → `/ID/sadhu.png`
- `bhrashtachar` → `/ID/bhrast.png`
- `recall` → `/ID/right.png`
- `muslim` → `/ID/mushlim.png`

### 3. **Photo Upload System**
- User apni photo upload kar sakta hai
- Photo preview dikhta hai
- Photo ID card mein automatically add ho jati hai

### 4. **Automatic ID Card Generation**
Registration complete hone par:
1. Unique registration number generate hota hai
2. User ka data save hota hai (localStorage mein)
3. ID card automatically generate hota hai with user details
4. User ko registration number dikhta hai
5. ID card preview dikhta hai
6. Download button available hota hai

### 5. **ID Card Download by Registration Number**
Naya page `/download-id` par:
- User apna registration number daal sakta hai
- System registration data fetch karega
- ID card generate hoga
- Download kar sakte hain

## 📁 Files Created/Modified

### New Files:
1. **`src/utils/registrationUtils.js`** - Registration number generation aur data storage
2. **`src/components/IDCardGenerator.jsx`** - ID card generation component
3. **`src/pages/IDCardDownloadPage.jsx`** - Registration number se ID card download page

### Modified Files:
1. **`src/pages/RegistrationPage.jsx`** - Photo upload, registration number generation, ID card display
2. **`src/App.jsx`** - ID Card download page route added
3. **`src/components/layout/Navbar.jsx`** - ID Card link added

## 🚀 How It Works

### Registration Flow:
1. User form bharta hai
2. Photo upload karta hai
3. Submit karta hai
4. System:
   - Registration number generate karta hai
   - Data localStorage mein save karta hai
   - ID card generate karta hai
   - Success screen dikhata hai with registration number aur ID card
5. User ID card download kar sakta hai

### Download Flow:
1. User navbar se "ID Card" link par click karta hai
2. Registration number enter karta hai
3. System data fetch karta hai
4. ID card generate hota hai
5. User download kar sakta hai

## 🎨 ID Card Customization

Agar aapko ID card par text ki position change karni hai, to `IDCardGenerator.jsx` mein ye values adjust karein:

```javascript
const startX = 350  // Horizontal position
let startY = 280    // Vertical starting position

// Har field ke liye startY += 45 (gap between fields)
```

## 💾 Data Storage

Data localStorage mein save hota hai:
```javascript
{
  "RPS/2025/123456": {
    orgId: "patrakar",
    formData: { name: "...", mobile: "...", ... },
    regNumber: "RPS/2025/123456",
    timestamp: "2025-01-15T10:30:00.000Z",
    photo: "data:image/jpeg;base64,..."
  }
}
```

## 🔧 Future Enhancements

Agar backend add karna ho to:
1. `registrationUtils.js` mein API calls add karein
2. localStorage ki jagah database use karein
3. Photo upload ke liye file storage service use karein
4. Email/SMS notification add karein

## ✅ Testing

Test karne ke liye:
1. Registration page par jao
2. Koi bhi trust select karo
3. Form bharo aur photo upload karo
4. Submit karo
5. Registration number note karo
6. ID card download karo
7. Navbar se "ID Card" link par jao
8. Registration number enter karke ID card download karo

Sab kuch perfect kaam karega! 🎉
