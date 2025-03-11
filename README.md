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

Users should be able to state whether or not they have their period that day and select the type of flow.  

Users should be able to select physical symptoms ie. whether they have bloating, cramps, nausea, headaches, fatigue 

Users should be able to track mental health conditions ie. did they feel depressed, happy, irritable, anxious, stressed, content 

Users will also be able to navigate to a resources page and find more information on different health conditions and tools to help manage symptoms. 

## Implementation

### Tech Stack

React
- Javascript
- MySQL
- Express

- Client libraries: 
    - react
    - react-router-dom
    - axios
    - scss
- Server libraries:
    - node.js
    - knex
    - express
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

-   **User Data**: User ID and anonymized data preferences for privacy compliance.

-   **Health Logs**: Daily entries capturing period status (yes/no), flow type (light medium/heavy), physical symptoms, and mental states.

-   **Resources Data**: Articles, tips, and links categorized by health topics.

Relationships Between Data Points:
-   Each user has multiple health logs linked by date.
-   Health logs are associated with specific symptoms and moods tracked over time.

### Endpoints

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date. 

---

## Future Implementations
- implementing a chat bot to answer questions and find resources for users 
- implement a food tracker and utilize an external api to record nutritional value to better help educate users on what food is best for their medical conditions 
- create a community channel for users to share their experiences 


