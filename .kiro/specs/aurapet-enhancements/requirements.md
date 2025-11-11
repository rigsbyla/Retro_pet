# Requirements Document

## Introduction

This document outlines the requirements for enhancing the Emotional Pet application with a desktop-focused layout, rebranding to "AuraPet", expanded stat system inspired by classic Tamagotchi mechanics, and differentiated emotional impacts on pet stats.

## Glossary

- **AuraPet**: The rebranded name for the Emotional Pet application
- **Pet_System**: The digital pet care application that tracks and displays pet statistics
- **User**: The person interacting with the Pet_System
- **Stat**: A numerical metric (0-100) representing an aspect of the pet's wellbeing
- **Emotion**: A mood state selected by the User during check-in
- **Check-In**: A User action where they select their current emotional state
- **Journal_Entry**: A text-based reflection submitted by the User
- **Desktop_Layout**: A wider viewport design optimized for desktop screens (minimum 800px width)
- **Decay_Rate**: The rate at which stats decrease over time when not maintained

## Requirements

### Requirement 1

**User Story:** As a User, I want the application to feel designed for desktop use, so that it provides a comfortable viewing experience on larger screens

#### Acceptance Criteria

1. THE Pet_System SHALL render with a minimum width of 800 pixels on desktop viewports
2. THE Pet_System SHALL center content horizontally with adequate spacing on screens wider than 1200 pixels
3. THE Pet_System SHALL display components in a layout that utilizes horizontal space effectively
4. THE Pet_System SHALL maintain responsive behavior for tablet and mobile viewports below 800 pixels

### Requirement 2

**User Story:** As a User, I want the application to be called "AuraPet", so that it reflects the updated branding

#### Acceptance Criteria

1. THE Pet_System SHALL display "AuraPet" as the application title in the header
2. THE Pet_System SHALL use "AuraPet" in the browser document title
3. THE Pet_System SHALL reference "AuraPet" in the README documentation
4. THE Pet_System SHALL store data using a storage key that includes "aurapet" in the identifier

### Requirement 3

**User Story:** As a User, I want my pet to have hunger and sickness stats in addition to health and happiness, so that caring for it feels more like a classic Tamagotchi

#### Acceptance Criteria

1. THE Pet_System SHALL track a hunger stat with values from 0 to 100
2. THE Pet_System SHALL track a sickness stat with values from 0 to 100
3. THE Pet_System SHALL display all four stats (health, happiness, hunger, sickness) in the Stats component
4. THE Pet_System SHALL initialize hunger at 30 and sickness at 0 for new pets
5. WHEN time passes, THE Pet_System SHALL increase hunger by 2 points per hour
6. WHEN hunger exceeds 70, THE Pet_System SHALL increase sickness by 1 point per hour
7. WHEN sickness exceeds 50, THE Pet_System SHALL decrease health by 2 points per hour

### Requirement 4

**User Story:** As a User, I want different emotions to affect my pet's stats differently, so that my emotional check-ins have meaningful and varied impacts

#### Acceptance Criteria

1. WHEN the User selects a positive emotion (happy, excited, grateful), THE Pet_System SHALL increase happiness by 20 points and decrease hunger by 10 points
2. WHEN the User selects a positive emotion (happy, excited, grateful), THE Pet_System SHALL increase health by 5 points
3. WHEN the User selects a neutral emotion (calm, neutral), THE Pet_System SHALL increase happiness by 10 points and decrease hunger by 15 points
4. WHEN the User selects a neutral emotion (calm, neutral), THE Pet_System SHALL increase health by 10 points
5. WHEN the User selects a negative emotion (sad, anxious, angry), THE Pet_System SHALL increase happiness by 5 points and decrease hunger by 5 points
6. WHEN the User selects a negative emotion (sad, anxious, angry), THE Pet_System SHALL increase health by 3 points
7. WHEN the User selects any emotion, THE Pet_System SHALL decrease sickness by 5 points
8. THE Pet_System SHALL ensure all stat values remain within the 0-100 range after any update

### Requirement 5

**User Story:** As a User, I want journal entries to have a balanced impact on all stats, so that journaling remains a valuable self-care activity

#### Acceptance Criteria

1. WHEN the User submits a Journal_Entry, THE Pet_System SHALL increase happiness by 25 points
2. WHEN the User submits a Journal_Entry, THE Pet_System SHALL increase health by 20 points
3. WHEN the User submits a Journal_Entry, THE Pet_System SHALL decrease hunger by 20 points
4. WHEN the User submits a Journal_Entry, THE Pet_System SHALL decrease sickness by 15 points
5. THE Pet_System SHALL ensure all stat values remain within the 0-100 range after journal submission
