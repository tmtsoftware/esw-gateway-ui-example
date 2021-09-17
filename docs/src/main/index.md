# Gateway UI Application Tutorial

For TMT, many highly functional user interfaces can be written that do not require their own backend logic; that is,
while running, they only need to access existing HTTP services, such as CSW Services like the Location Service and 
the Configuration Service, and the ESW UI Gateway, which provides HTTP access to components and other CSW Services.

The services which are provided by the UI Gateway include:

- Command Service (sending commands to Assemblies and HCDs)
- Sequencer Service (sending sequences to a Sequencer)
- Event Service
- Alarm Service
- Admin Service
- Logger Service

These applications are called "Gateway UI Apps" and are contrasted with "Web Apps", which in our context implies custom
backend logic.  Despite the name, Gateway UI Apps may interact with other existing HTTP services along with the 
UI Gateway.  The distinction is that is does not require its own HTTP service to operate, other that something
to serve the pages.  In fact, the ESW Gateway UI [template](https://github.com/tmtsoftware/esw-gateway-ui-template.g8) 
can be used to create UI apps that do not use the Gateway, although that is the intention, as the template will set up 
the necessary wiring for it.

## Tutorial Welcome

This tutorial uses a set of smaller tutorials to create a UI Application using the ESW Gateway UI template.
The application created in this tutorial has 2 example features.

1. Creating a command in the UI using a form, and submitting the command to an assembly/HCD.
2. Subscribing to an event and displaying the event content on the UI when the event is received.

The tutorial has been divided into 3 main flows. First, you will create the application using the tutorial, set up
a simple login component, and run the bare-bones version of the app.  Next, the form for creating a command is added,
and you will learn how to send the command to a component through the gateway.  Lastly, it will be demonstrated how
to subscribe to an Event via the Gateway and display the result in the UI.  

An additional flow is provided to show how to add documentation to your UI.

If at any point in time you want to see the completed tutorial, you can view the final code [here](https://github.com/tmtsoftware/esw-gateway-ui-example).

@@toc { depth=1 }
@@@ index

- @ref:[Creating Gateway UI Application](flows/base-flow.md)
- @ref:[Adding Submit Command Example](flows/submit-commands.md)
- @ref:[Adding Subscribe Event Example](flows/subscribe-event.md)
- @ref:[Using Paradox Documentation](flows/docs-flow.md)

@@@
