# Creating a Web Application

This flow demonstrates how to use the template to create our project, how to add UI components for adding particular features,
and how to build and test it.

In this tutorial, we will first generate the application from the template, and build it to ensure tools are in place.
Then, we will delete the default implementation and replace it with our own implementation of a `Submit command to an assembly` & `Subscribe to an event` UI component. To
do this, we will delete much of the template code and rewrite our own components custom to our implementation.

## Generate Application

First we need to generate a scaffolding application using our giter8 template:

```bash
g8 tmtsoftware/esw-ui-template.g8 --name=sample
```

This will generate a sample folder with `docs` and `src` folders.  For a sanity check, let's go ahead and
build the frontend created by the template.  This will also help ensure you have the necessary tools installed.

You are welcome to try out the generated sample project, which is basically a "Hello World" application, by following
the  instructions in the READMEs in each sub-folder.

### Compile the Frontend

The `sample/src` sub-folder is where your frontend application is located.  It uses Typescript, React and node.
Make sure node version `v16.0.0` or higher is installed in your machine. Let's compile our generated application.

```bash
cd sample
npm install
npm run build
```

@@@ note
This tutorial uses the current ESW.UISTD selections for user interface languages, libraries, and tools. These are the current selections.
They will be reviewed and updated once again as part of ESW Phase 2.
@@@

## Open in Development Environment

At this point, you may want to open the project in an Integrated Development Environment (IDE), such as Intellij,
if you are using one.  The template creates a Typescript/npm-based frontend. We recommend VS Code or Intellij for the frontend applications.

To open the UI project in VS Code, click on `File->Open` Or To open the UI project in Intellij, click on `File->New Project from Existing Sources`

Then browsing to the UI directory, open the `sample` project.  It should have a package.json file in it.

## Create the Frontend

In this section, we will be constructing a browser-based UI using React components in Typescript.  We will create
components that allow the user to specify various inputs in a form (e.g Setup/Observe command to be sent an Assembly or an HCD via `select` html tags),
and then the a Submit button that will send the data to our
backend.  The response will then be rendered in UI components. We will also provide components to get and display the
list of stored coordinates.  This section of the tutorial will show how to add and render custom components within the
application that act as clients to consume our gateway backend routes.

@@@ note
The frontend tutorial uses functionality from the ESW-TS library.  Be sure and look at the documentation for ESW-TS once
you start working on your own UI.  ESW-TS documentation can be found [here](http://tmtsoftware.github.io/esw-ts).
@@@

### Create login component

We need the user to login via keycloak's login page. So we need to have a way to redirect the user.
hence, Add the `Login.tsx` in components folder which will redirect the user to keycloak's login page.
Later we will use this `Login` Component in `Main.tsx`.

Typescript
: @@snip [Login.tsx](../../../../src/components/Login.tsx) { #login-page }

### Update Main & App component with authentication

First lets wrap our Main application with `AuthContextProvider` from `esw-ts` in `App.tsx` as shown below

Typescript
: @@snip [App.tsx](../../../../src/App.tsx) { #auth-context }

Now, lets update the `Main.tsx` component in our frontend UI to have login functionality.

Typescript
: @@snip [Main.tsx](../../../../src/components/Main.tsx) { #auth }

After adding this section, run the following command to see the progress that we made till now.

```bash
npm start
```

you must be getting `Loading...` on the browser screen.
Because, The UI is now trying to find the Auth server & we have not yet started any of the required backend services.

Let's start the required backend services along with Auth server for further use cases.

## Starting backend services

Start the Location Service with the Authorization and Authentication Service, Config Service & Event Service(we will use event service in the next section of the tutorial).

```bash
cs install csw-services:v4.0.0-RC1
csw-services start -k -c -e
```

Start Gateway Service using esw-services.

```bash
cs install esw-services:0.3.0-RC1
esw-services start -g

```

Try reloading the front end in browser,

```bash
npm start
```

You should be getting redirected to keycloak login page.
Try logging in with one of predefined users in csw-services.

Visit [here](https://tmtsoftware.github.io/csw/0.1.0-SNAPSHOT/apps/cswservices.html#predefined-users-) to find the predefined users.

Visit [here](https://tmtsoftware.github.io/esw/0.1.0-SNAPSHOT/uisupport/gateway.html) to know more about users & the roles.

Once you are logged in, you would be greeted again with `Hello world`.

Now, we can make use of Auth data to send request on the protected route of Gateway server.

### Cleanup

We can get rid of the unwanted css generated from the template:

* Go to the `components` folder in `src` and delete `Main.module.css` file under this directory

### Next Steps

* Follow the tutorial @ref:[here](./submit-commands.md) to add an Submit Command Example.
* Follow the tutorial @ref:[here](./subscribe-event.md) to add an Subscribe Event Example.
