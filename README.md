# Introduction
GitHub Issues Navigator (hereafter referred to as GIN) enables anyone with a GitHub account to search and explore the issues of a repository using the power of GraphQL. Below you'll find a step-by-step guide on how to use GIN. Have fun!
# Signing in
First, in order to gain access to GitHub's GraphQL API we need a valid access token. This will also allow GitHub to identify you, the viewer. After you've signed up for GitHub, head over to GIN and click the `Login with GitHub` button.
After clicking the button you'll be redirected to GitHub. If you're not logged in to GitHub you'll be requested to do so in this step. After logging in, click `Authorize` and that's it! You'll be redirected back to GIN's start page with everything ready to go.

# Finding a repository
By default, GIN takes you to Facebook's `react` repository, but you also have the freedom to choose any repository you want. In order to choose a different repository, click the `Edit` button and in the first input field type the name of the owner of the repository. In the second input field type the name of the repository. And finally, click the `Save` button. After clicking `Save` GIN will try to find the repository and automatically load all the open issues in that repository. In case you mispelled the owner's name or the repository name, GIN will simply display a message asking you to double check if the data is correct.

# Filtering and searching
After you've successfully chosen a repository, GIN will show you a list of all the issues in that repository. To make viewing easier you can filter the issues by state: open or closed. By default GIN will show you the open issues first. You can also do a full text search in the `title` and `body` fields by typing the words in the text input and then clicking `Search` or by simply using the return key. Now you should see all the issues that match your search criteria.

# Viewing an issue
After you've found your issue from the list, simply click on it and you'll be taken to a new screen where you can check out the issue in more detail. In this screen you can also view all the comments of that issue.

# Development
If you want to run GIN locally here's what you have to do:
- clone the repository
- `$ cd gh-issues-nav`
- `$ yarn`
- make a copy of the `.env` file called `.env.local` and fill out the required fields
  - REACT_APP_CLIENT_ID: first, see `Creating a GitHub OAuth app`, then go to `GitHub > Settings > Developer settings > OAuth apps` and select your application where you'll find your `Client ID`.
  - REACT_APP_CLIENT_SECRET: see `Creating a GitHub OAuth app`
  - REACT_APP_REDIRECT_URI: `<your application's URL>/login`
  - REACT_APP_PROXY_URL: `<your application's proxy server URL>/authenticate`
  - SERVER_PORT: the port which the Express proxy server should listen on
- `$ yarn start`
- GIN uses Create React App as its base, so if you have any questions or run into any issues try looking there first

# Creating a GitHub OAuth app
- on GitHub go to `Settings > Developer settings > OAuth apps` and click `New OAuth app`
- after providing all the necessary information make sure to copy you application's `Client secret` in the final step as for this will be needed if you decide to run GIN locally

# Tools used
- React with hooks and context
- Redux
- React router
- Apollo client
- Tailwind CSS
- Rollbar for error reporting
- `source-map-explorer` for viewing bundle sizes
- Express for the proxy server