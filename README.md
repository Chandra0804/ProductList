# Product List Web App

This is a React web application for displaying and filtering a list of products. It provides users with the ability to sort and filter products by category, and view them in a responsive and visually appealing manner.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/your-repo.git
   ```

2. Install the necessary dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Open your web browser and navigate to `http://localhost:3000` to access the application.

## Features

### Sorting

- The application allows you to sort the products by price.
- You can choose from the following sorting options:
  - Default (No sorting)
  - Price (Lowest to Highest)
  - Price (Highest to Lowest)

### Filtering

- The application allows you to filter products by category.
- You can select a category from the drop-down menu to view products belonging to that category.

### Product List

- The product list is displayed in a visually appealing grid layout.
- Each product is represented by a card containing:
  - Images (with a carousel to view multiple images)
  - Title
  - Description
  - Price

### Image Carousel

- When hovering over a product, it starts an image carousel.
- The image carousel displays multiple images of the product.
- Images automatically cycle every 1 second.

### Pagination

- Products are paginated for easier navigation.
- You can switch between pages to view more products using the pagination controls at the bottom.

## Code Structure

The main code is contained in the `App.js` file. It uses React and styled-components to create a responsive and interactive product list. Here's a brief overview of the code structure:

- It imports the necessary dependencies, including React, styled-components, and product data.
- It defines styled components for layout and styling.
- The component `App` manages the state, sorting, filtering, and pagination logic.
- It sorts and filters the product data based on user selections.
- The product list is rendered in a grid layout with an image carousel for each product.
- The code also handles hover events to start and stop the image carousel.
- Pagination allows users to navigate through the product list.

## Usage

Feel free to use and modify this code as needed for your projects. You can customize the product data, styling, and functionality to suit your requirements.
