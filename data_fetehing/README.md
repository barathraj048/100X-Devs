
# Data Fetcher App

This project is a simple **React-based To-Do Fetcher** application that retrieves and displays a list of to-do items from an external API. The app fetches data at specified intervals using a custom hook and updates the UI with new data as it is received.

## Features

- Fetches to-do items from a backend API using **Axios**.
- Periodic data fetching using a **custom hook** (`useDataFetch`).
- Displays a loading state while fetching data.
- Simple UI to show a list of to-dos with real-time updates.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Axios**: HTTP client for making API requests.
- **CSS**: Custom styling for the app.
- **Custom Hook**: `useDataFetch` to handle data fetching and updating.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/barathraj048/100x-devs.git
   ```

2. Navigate to the project directory:
   ```bash
   cd data_fetching
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```

2. The app will be available at `http://localhost:3000/`.

## `useDataFetch` Custom Hook

The `useDataFetch` custom hook is a reusable hook to fetch data from a given API at regular intervals. It handles loading states and updates the component every time new data is fetched.

### Parameters:

- **`apiURL`**: The URL of the API endpoint from which to fetch the data.
- **`intervalTime`**: The interval in seconds at which to fetch data from the API.

### How It Works:
- **Fetching data**: It fetches data using **Axios** every `intervalTime` seconds.
- **Loading State**: Displays a loading message while fetching data.
- **Updating State**: Once data is fetched, it updates the state of the component with the new data.

### Example Usage of `useDataFetch`:

Here’s how you can use the `useDataFetch` custom hook inside your React component to fetch and display to-do items from a remote API.

```jsx
import React from 'react';
import useDataFetch from './customhooks/retrieve_from_backend'; // Custom hook import

function App() {
  const { todos, loading } = useDataFetch('https://jsonplaceholder.typicode.com/todos', 5); // Fetch every 5 seconds

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {todos.map((todo, index) => (
            <div key={index} className="Style">
              {todo.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
```

### API Used:

The default API used in this example is **JSONPlaceholder** (https://jsonplaceholder.typicode.com/todos), which provides fake to-do data for testing purposes. You can replace the API URL with any valid API endpoint to fetch your own data.

---

## `useDataFetch` Hook Code:

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function useDataFetch(apiURL, intervalTime) {
  const [todos, setTodos] = useState([]);      // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchData = () => {
      axios.get(apiURL)
        .then((response) => {
          setTodos(response.data);  // Update todos state with the fetched data
          setLoading(false);        // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);        // Stop loading on error
        });
    };

    fetchData(); // Initial data fetch

    const intervalId = setInterval(fetchData, intervalTime * 1000); // Fetch data at regular intervals

    return () => clearInterval(intervalId); // Cleanup: clear the interval on unmount or dependency change
  }, [apiURL, intervalTime]);

  return { todos, loading };
}

export default useDataFetch;
```

### Parameters Explanation:
- **`apiURL`**: The URL to the API you want to fetch data from.
- **`intervalTime`**: The time interval (in seconds) at which you want to refresh the data.

### How it works:
1. **Initial Fetch**: When the component mounts, the data is fetched immediately using the `fetchData` function.
2. **Set Interval**: The `setInterval` function triggers `fetchData` at the interval specified by `intervalTime`.
3. **Cleanup**: When the component unmounts or when dependencies change, the `clearInterval` function ensures that there are no lingering intervals, avoiding memory leaks.

---

## Contribution

Feel free to fork the repository, make changes, and submit pull requests. Contributions are welcome!

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This `README.md` provides a professional, structured overview of your React project and the `useDataFetch` custom hook. You can adapt this as needed based on the specifics of your project.