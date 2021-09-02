# ESW UI Application Tutorial

In the ESW user interface design a UI application is used when the user interface has to make use of the interfaces of the control system provided by the User Interface Gateway. For instance, a UI application
should be used if Services behind Gateway server needs to be accessed.

Creating a web application is not trivial and requires the programmer to understand several technologies as well as the
ESW authentication and authorization system. Therefore, it is recommended that this approach be taken only when
necessary.

## Tutorial Welcome

This tutorial uses a set of smaller tutorials to create a UI Application using the ESW UI Application [template](https://github.com/tmtsoftware/esw-ui-template.g8).

The application created in this tutorial has 2 example features.

1. Submmiting a command to an assembly/HCD by giving appropriate values in the UI form.
2. Subscribing to an event and display the event's content on the UI as soon as the event is received.

The tutorial has been divided into 3 main flows that incrementally demonstrate the addition of both the above 2 features using the interfaces of
Gateway server.

The basic flow in "Creating a UI Application" will show you how to add a route to the backend application and consume them in your frontend.
The flows following the basic flow are incremental steps to make the application more complete.

If at any point in time you want to see the completed tutorial, you can view the final code [here](https://github.com/tmtsoftware/esw-ui-example).

@@toc { depth=1 }
@@@ index

- @ref:[Creating a UI Application](flows/base-flow.md)
- @ref:[Adding Submit Command Example](flows/submit-commands.md)
- @ref:[Adding Subscribe Event Example](flows/subscribe-event.md)
- @ref:[Using Paradox Documentation](flows/docs-flow.md)

@@@
