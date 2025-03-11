# Project Title
periodic.ally   

## Overview

periodic.ally is a web application designed to empower users to manage their reproductive health. This web application will serve as an ally to those navigating complex interplay between reproductive, physical and mental well-being.  By offering comprenhensive tracking, users can uncover potential correlation between different aspects of their health and gain insight to their body's unique needs and patterns. 

### Problem Space

Misdiagnosis is a significant issue in female health, particularly concerning reproductive health conditions. Medical education has historically been centered on male physiology, leading to gaps in understanding female-specific conditions. This results in symptoms being overlooked or misattributed. Furthermore many individuals have their symptoms frequently dismissed as stress, hormonal changes, or psychological issue.

1 in 4 women (24%) surveyed experienced a misdiagnosis of a gynaecological condition, including endometriosis, PCOS, pregnancy, ovarian cysts, and period pain. Endometriosis is the most frequently misdiagnosed gynaecological condition, affecting nearly 1 in 10 women. 75.2% of endometriosis patients reported being misdiagnosed with another physical health (95.1%) and/or mental health problem (49.5%). PCOS (Polycystic Ovary Syndrome) is also highly correlated with disorders such as Type 2 diabetes, increased risk of heart disease, sleep apnea, and mood disorders. 

### User Profile

The web application can be used by folks who wish to record their reproductive health journey and track other physical and mental health conditions. The app will make note on days where symptoms are most severe. This ensures users can accurately display information to medical professionals and observe trends throughout their usage of the application. 


### Features

**User Capabilities**
- Period Tracking: Users can state whether or not they have their period that day and select the type of flow.

- Physical Symptom Tracking: Users can select physical symptoms such as bloating, cramps, nausea, headaches, and fatigue.

- Mental Health Tracking: Users can track mental health conditions including depressed, happy, irritable, anxious, stressed, and content.

- Log Management: Users can edit existing log entries to update symptoms or flow type using prepopulated options, and delete existing log entries.

- Symptom Severity Rating: For each tracker, the user can rate how severe the symptoms were.

**Visual Representation**
- The calendar view will highlight each day based on the most severe symptom category logged. This will help users identify trends:

    - Physical Symptoms Dominant: A specific color (e.g., red).

    - Mental Health Dominant: A different color (e.g., blue).

    - All Symptoms Severe: Another distinct color (e.g., purple).

**Additional Resources**
- Users will also be able to navigate to a resources page and find more information on different health conditions and tools to help manage symptoms.- 

## Implementation

### Tech Stack

- React (react-router-dom, axios)
- Javascript
- MySQL
- Express
- Node.js
- Knex
- JWT

### APIs

- No external APIs will be used for the first sprint

### Sitemap

**Home Page**
- Overview of the app's purpose and features
- Quick links to key sections like tracking and resources

**Tracker Dashboard**
- Menstrual cycle tracking (e.g., period start/end, flow type)
- Physical symptom logging (e.g., cramps, fatigue)
- Mental health logging (e.g., mood tracking)
- Color-coded calendar view to visualize symptom severity trends

**Resources Page**
- Articles and guides on reproductive health conditions (e.g., endometriosis, PCOS)
- Tips for managing symptoms effectively
- Links to support groups or telehealth services

**Help & Support**
- FAQs about app usage
- Contact information for technical support


### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

### Data

The app's data structure will include the following key entities:

- **User Data**: User ID and anonymized data preferences for privacy compliance.
- **Health Logs**: Daily entries capturing period status (yes/no), flow type (light medium/heavy), physical symptoms, and mental states.
- **Resources Data**: Articles, tips, and links categorized by health topics.
- **Calendar Colors**: Severity-based color codes linked to daily logs.

Relationships Between Data Points:
- Each user has multiple health logs linked by date.
- Health logs are associated with specific symptoms and moods tracked over time.
- Calendar colors are dynamically generated based on log data.

### Endpoints

The server will implement the following endpoints:

***User Authentication:***
**POST** /register: Register a new user.
Request: 
```
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
```
Response:
```
{
  "message": "User registered successfully!",
  "userId": 1
}
```
**POST** /login: Authenticate a user and return a JWT.
Request:
```{
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
```
Response:
```
{
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

***Health Logs:***
**GET** /logs: Retrieve all logs for a user (parameters: user ID).
Request GET /logs?userId=1: 
```
  {
    "logId": 101,
    "userId": 1,
    "date": "2025-03-10",
    "symptoms": {
      "physical": ["bloating", "cramps"],
      "mental": ["anxious"]
    },
    "flowType": "Heavy",
    "severityRating": {
      "physical": 3,
      "mental": 2
    }
  },
  {
    "logId": 102,
    "userId": 1,
    "date": "2025-03-11",
    "symptoms": {
      "physical": ["fatigue"],
      "mental": ["stressed"]
    },
    "flowType": null,
    "severityRating": {
      "physical": 2,
      "mental": 3
    }
  }
```
**POST** /logs: Add a new log entry (parameters: date, symptoms, mood).
Request:
```
    {
  "userId": 1,
  "date": "2025-03-12",
  "symptoms": {
    "physical": ["headaches", "nausea"],
    "mental": ["content"]
  },
  "flowType": null,
  "severityRating": {
    "physical": 2,
    "mental": 1
  }
}
```
Response:
```
    {
  "message": "Log added successfully!",
  "logId": 103
}
```
**PUT** /logs/:id: Update an existing log entry (parameters: log ID, updated data).
Request: PUT/logs/103
```
{
  "logId": 103,
  "updatedData": {
    "symptoms": {
      "physical": ["headaches"],
      "mental": ["happy"]
    },
    "severityRating": {
      "physical": 1,
      "mental": 2
    }
  }
}
```
Response:
```
    {
  "message": "Log updated successfully!"
}
```
**DELETE**/logs/:id: Delete an existing long entry (parameters: log ID)
Response: DELETE /logs/103
```
{
  "message": "Log deleted successfully!"
}
```


***Resources:***
**GET** /resources: Fetch articles and tips based on category (parameters: category ID).
GET /resources?categoryId=2
Response Example:
```
  {
    "resourceId": 201,
    "title": "Managing Stress During Your Cycle",
    "url": "/resources/managing-stress"
  },
  {
    "resourceId": 202,
    "title": "Foods to Help with Cramps",
    "url": "/resources/foods-for-cramps"
  }
```

[!NOTE]
- All endpoints require authentication via a JWT token in the Authorization header (e.g., Authorization: Bearer <token>).
- Severity ratings are on a scale of 1 (mild) to 3 (severe).
- Categories for resources can include topics like mental health (categoryId:1), physical symptoms (categoryId:2), or general health tips (categoryId:3).

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date. 

---

## Future Implementations
- implementing a chat bot to answer questions and find resources for users 
- implement a food tracker and utilize an external api to record nutritional value to better help educate users on what food is best for their medical conditions 
- create a community channel for users to share their experiences 


