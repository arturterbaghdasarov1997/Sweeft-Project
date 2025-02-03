# Sweeft-Project: Photo Gallery App

## Overview
The **Photo Gallery App** is a React-based web application that allows users to browse popular images from Unsplash, search for specific images, and view search history. It features infinite scrolling, a caching mechanism to reduce redundant API requests, and a detailed modal view for each image.

## Features
- **Main Page**
  - Displays the **20 most popular images** by default.
  - Includes a **search box** that updates images dynamically based on user input.
  - Uses a **caching mechanism** to prevent redundant API requests when revisiting previous searches.
  - Supports **infinite scrolling** for seamless image browsing.
  
- **History Page**
  - Displays all previous search terms used by the user.
  - Clicking on a search term reloads the corresponding images from the cache.
  - Allows users to **delete specific search terms** or **clear the entire history**.

- **Image Modal**
  - Displays the **full version** of an image when clicked.
  - Shows additional details, including:
    - **Number of downloads**
    - **Views**
    - **Likes**
  - Provides an option to **download the image** in its original format.

## Technologies Used
- **React** (Frontend Framework)
- **TypeScript** (Static Typing)
- **Unsplash API** (Image Data)
- **Axios** (API Requests)
- **React Router** (Navigation)
- **LocalStorage & SessionStorage** (Caching and History Management)

## Usage
1. **Browse Popular Images**: Open the main page to see the top 20 trending images.
2. **Search for Images**: Type in the search box to update the image results dynamically.
3. **View Search History**: Visit the history page to see past searches and click to reload them.
4. **Infinite Scroll**: Scroll down to load more images dynamically.
5. **Open Image Modal**: Click on an image to view details and download it.

## Installation & Setup
1. **Clone the repository:**
git clone https://github.com/arturterbaghdasarov1997/Sweeft-Project.git
cd Sweeft-Project

2. **Install dependencies:**
npm install

3. **Run the application:**
npm run dev

4. **Access the app:**
Open http://localhost:5173 in your browser.
