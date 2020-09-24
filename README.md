## About Umbrella Whether

Umbrella Whether is a simple React app which uses Redux and the OpenWeatherMap API to retrieve and display the current weather information for a list of cities, as well as providing a means for users to leave notes on the page for any given location.

On launch by a first-time user, Umbrella Whether will attempt to retrieve the current weather information for the fifteen most populous cities in the world, which will be displayed in alphabetical order. It will, additionally, request the user's geolocation information. If granted, it will then show the user the current weather based on their location. This location will be stored in the list available on the home page for future viewing.

## How to Use - Home Page

From the home page, the list of stored locations can be maintained. Users can delete entries from the list, or click on the eye icon or the location name to view more detailed information about the current weather status.

Deleting entries from the location list will also delete any associated notes.

At the top of any given page, there will appear:
	- A search bar, into which users can enter a city and country, or city and US state to search for the weather at that location.
	- A Celsius/Fahrenheit button which can be used to switch between units as desired.

## How to Use - Details Page

On clicking the eye icon or name of a given location, users will be brought to a page displaying more detailed information on the current weather status. Also on this page, users may click 'Add a Note' to add a new note, after which it will appear on that details page for this and any future viewings, providing local storage is not cleared.

Existing notes may be edited using the pen/edit button or deleted using the trash can button.

## Additional Information

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
