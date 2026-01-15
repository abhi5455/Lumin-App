# Lumin

**Transparent placement insights powered by real alumni outcomes**

A comprehensive mobile platform that bridges the gap between students and their career futures by centralizing placement data, alumni networks, and recruitment intelligence into one actionable ecosystem.

---

## 🎯 Overview

Lumin transforms how students prepare for placements by providing data-driven insights instead of speculation. Built for college communities, it creates transparency around recruitment patterns, salary trends, and alumni career trajectories—empowering students to make informed decisions about their future.

## 💡 Problem Statement

Students face significant challenges during placement season:
- Fragmented placement data scattered across departments
- Limited visibility into which companies recruit consistently
- Lack of access to alumni career paths and experiences
- No centralized platform for interview preparation resources
- Difficulty understanding realistic salary expectations and role availability

Lumin solves these problems by creating a single source of truth for all placement-related information.

## 📱 Demo & Download

### Try the App
**[Download Lumin APK from Google Drive](https://drive.google.com/drive/folders/1plvQ-pelUM0-mNcRpNQJqj6Fgz0lCUAS?usp=drive_link)**

### Screenshots

<div align="left">
  <img width="200" height="700" alt="LuminImg1" src="https://github.com/user-attachments/assets/1ec2fb76-b8dd-4229-9304-7ed19ab5c0dd" />
  <img width="200" height="700" alt="LuminImg2" src="https://github.com/user-attachments/assets/8c51c14f-ec17-4274-9144-d770ba35073d" />
  <img width="200" height="700" alt="LuminImg3" src="https://github.com/user-attachments/assets/665e55d4-4487-42ff-8073-c2cbc23cfd12" />
  <img width="200" height="700" alt="LuminImg4" src="https://github.com/user-attachments/assets/db34b025-2eb9-4402-a7a4-73d824c6a5ce" />
  <img width="200" height="700" alt="LuminImg5" src="https://github.com/user-attachments/assets/30ac56b4-b93c-4bd2-996e-6bbd100ba032" />
  <img width="200" height="700" alt="LuminImg7" src="https://github.com/user-attachments/assets/bd98ca29-8bfd-4f59-857e-70dddb50f9e1" />
  <img width="200" height="700" alt="LuminImg6" src="https://github.com/user-attachments/assets/c5ddd2b8-d5cc-4288-af6d-26dbd1d5e021" />
</div>

---

## ✨ Core Features

### 📊 Placement Intelligence Dashboard
- **Company Recruitment History**: Track which companies visit campus year-over-year
- **Role Distribution**: Understand available positions by department and skill set
- **Salary Analytics**: Transparent view of average packages, trends, and compensation ranges
- **Placement Statistics**: Success rates, offer conversion metrics, and historical data

### 🎓 Alumni Network & Insights
- **Live Alumni Profiles**: Real-time updates on where graduates are working
- **Career Path Tracking**: See progression from campus to current roles
- **Experience Sharing**: Alumni-contributed interview experiences and preparation tips
- **Mentorship Opportunities**: Connect with seniors for guidance and advice
- **Company Referrals**: Leverage alumni networks for recruitment opportunities

### 📚 Knowledge Hub
- **Interview Experiences**: Detailed accounts from alumni who cracked top companies
- **Preparation Resources**: Curated study materials, coding practice, and aptitude guides
- **Company-Specific Guides**: Targeted prep material for frequently recruiting companies
- **Blog & Articles**: Career advice and industry insights from successful alumni

### 🏫 Admin Panel (Placement Cell)
- **Data Management**: Centralized control over placement records and statistics
- **Alumni Engagement**: Track and encourage alumni participation
- **Recruitment Insights**: Leverage data to attract companies and improve placement outcomes
- **Access Control**: Secure, role-based permissions for students, alumni, and administrators

### 🔐 Security & Authentication
- **Verified Access**: College email-based authentication
- **Role-Based Permissions**: Different access levels for students, alumni, and admins
- **Data Privacy**: Secure handling of sensitive placement and personal information

---

## 🛠️ Technology Stack

### Mobile Application
- **Framework**: React Native
- **Language**: TypeScript
- **UI Library**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: React Navigation

### Backend & Database
- **Backend as a Service**: Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or Yarn
- React Native development environment
- Xcode (for iOS) / Android Studio (for Android)
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/abhi5455/Lumin-App.git
cd Lumin-App
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Supabase**
    - Create a Supabase project
    - Add your Supabase URL and API keys to environment variables
    - Set up database schema (migrations provided in `/supabase` folder if available)

4. **Install iOS dependencies** (macOS only)
```bash
bundle install
cd ios
bundle exec pod install
cd ..
```

### Running the Application

#### Start Metro
```bash
npm start
# or
yarn start
```

#### Run on Android
```bash
npm run android
# or
yarn android
```

#### Run on iOS
```bash
npm run ios
# or
yarn ios
```

---

## 📂 Project Structure

```
Lumin-App/
├── android/              # Android native code
├── ios/                  # iOS native code
├── src/
│   ├── components/       # Reusable UI components
│   ├── screens/          # App screens
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API and Supabase services
│   ├── utils/            # Helper functions
│   ├── contexts/         # React Context providers
│   └── types/            # TypeScript type definitions
├── __tests__/            # Test files
├── App.tsx               # Root component
└── package.json          # Dependencies
```

---

## 🎨 Key Functionalities

### For Students
1. Browse placement statistics and company insights
2. Explore alumni career paths and success stories
3. Access interview experiences and preparation resources
4. Connect with alumni for mentorship
5. Track placement trends and opportunities

### For Alumni
1. Update current employment status and role
2. Share interview experiences and tips
3. Contribute blogs and career advice
4. Mentor current students
5. Participate in campus recruitment initiatives

### For Placement Administrators
1. Manage placement data and statistics
2. Track alumni career progression
3. Control user access and permissions
4. Facilitate alumni-student connections

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔗 Links

- **Repository**: [github.com/abhi5455/Lumin-App](https://github.com/abhi5455/Lumin-App)
- **APK Download**: [Google Drive](https://drive.google.com/drive/folders/1plvQ-pelUM0-mNcRpNQJqj6Fgz0lCUAS?usp=drive_link)

---
