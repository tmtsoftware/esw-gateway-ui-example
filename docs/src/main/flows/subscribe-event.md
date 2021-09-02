# Adding Subscribing An Event Example

In this use case, we want to Subscribe to an event which will be published by an Backend Component.
We will be using EventService to publish a SystemEvent(counterEvent) every 2 seconds inside esw-shell utility.

Visit [here](https://tmtsoftware.github.io/csw/0.1.0-SNAPSHOT/params/events.html) to learn more about events.

## Add Subscribe Event Component

Assuming that you have followed atleast the @ref:[basic flow](./base-flow.md), we can go further and add subscribing to an event feature in our UI.

Add `SubscribeEvent.tsx` file in `src/components` folder.

SubscribeEvent component looks like following:

@@@note
You can refer the source code of the completed application at any point in the course of this tutorial.
You can find it [here](https:github.com/tmtsoftware/esw-ui-example)
@@@

Typescript
: @@snip [SubscribeEvent.tsx](../../../../src/components/SubscribeEvent.tsx) { #subscribe-event }

We need to add form element to take input from the user.
This Form includes two input fields

* SourcePrefix - A free text input box for putting Source Prefix of the desired subscription.
* Event KeyName - A free text input box for putting Event's keyname of the desired subscription.
* Subscribe - A button for creating subscription. It gets toggled to `UnSubscribe` on success.

Add the following in the SubscribeEvent component

Typescript
: @@snip [SubscribeEvent.tsx](../../../../src/components/SubscribeEvent.tsx) { #subscribe-event-fields }

Add the following react states to hold the information of their corresponding user inputs.

Typescript
: @@snip [SubscribeEvent.tsx](../../../../src/components/SubscribeEvent.tsx) { #subscribe-event-state }

Now, lets add subscribe method which gets called `onFinish` of the form component.

This method makes use of [event service](https://tmtsoftware.github.io/esw-ts/services/event-service.html) typescript client which sits on top of the gateway server EventServer routes.
In this method, We call `subscribe` api of eventService to create subscription in a callback based fashion. the callback named `handleEvent` gets triggered when ever an event is recieved on that subscription.

Typescript
: @@snip [SubscribeEvent.tsx](../../../../src/components/SubscribeEvent.tsx) { #subscribe-event-subcription }

Now we have fully added the functionality of susbcribing to an event. all the events received on that subscription are added to list of `events` which is a react state. we can use this `events` react state to render event however we want to show them.

In this tutorial, we will make use of Table Antd component.

Lets add this final piece to our UI component below the `Form` component to visualize the recieved events.

Typescript
: @@snip [SubscribeEvent.tsx](../../../../src/components/SubscribeEvent.tsx) { #subscribe-event-table }

Also, Make sure to add appropriate imports to the file.

Typescript
: @@snip [SubscribeEvent.tsx](../../../../src/components/SubscribeEvent.tsx) { #subscribe-event-imports }

## Integrate SubscribeEvent Component

Finally, update Main.tsx to include `SubscribeEvent` component.

Typescript
: @@snip [Main.tsx](../../../../src/components/Main.tsx) { #subscribe-event }

UI should render the following view at this moment.

![submit-command.png](subscribe-event.png)

Fill in the values for all input fields and subscribe.

```text
Source Prefix : ESW.assembly123
Event KeyName : counterEvent
```

That's all we needed to do for adding an Subscribe Event feature!!!

Not, let's simulate an backend publishing some events and see them reflecting on UI in real-time.

## Publish events using esw-shell

Before moving ahead, if you have not started backend services. Then let's start backend services by following @ref:[this](./base-flow.md){#Starting-backend-services} steps.

Now, lets start esw-shell utility. It starts an ammonite repl with basic api's for us to publish events.

```bash
cs install esw-shell:0.3.0-RC1
esw-shell start 
@                 // you are inside ammonite repl now
```

Visit [here](https://tmtsoftware.github.io/esw/0.1.0-SNAPSHOT/eswshell/esw-shell.html) to learn more about the esw-shell utility.

We are using eventService's defaultPublisher API to publish events.

```scala
@ val counter = 0
@ def eventGenerator = Option{
    counter+=1
    SystemEvent(Prefix("ESW.assembly123"), EventName("counterEvent"), Set(IntKey.make("counter").set(counter)))
  }
@ eventService.defaultPublisher.publish(eventGenerator, 2.seconds)
```

This should start publishing events every 2 seconds from the source prefix `ESW.assembly123`.
