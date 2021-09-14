# Adding Submit Command Example

In this use case, we want to send a command (Setup/Observe) to an Assembly/HCD from the UI application via Gateway server.

Visit [here](https://tmtsoftware.github.io/csw/$csw-version$/params/commands.html) to learn more about commands.

Visit [here](https://tmtsoftware.github.io/csw/$csw-version$/commons/create-component.html) to learn more about Assembly / HCD components.

## Start an Assembly using esw-shell

Before moving ahead, if you have not started backend services. Then let's start backend services by following @ref:[this](./base-flow.md#starting-backend-services) steps.

Now, lets setup an assembly using esw-shell utility. It starts an ammonite repl with basic api's for us to orchestrate the backend services.

```bash
cs install esw-shell:97b32bc3
esw-shell start 
@                 // you are inside ammonite repl now
```

Visit [here](https://tmtsoftware.github.io/esw/$esw-version$/eswshell/esw-shell.html) to learn more about the esw-shell utility.

we are using [this](https://tmtsoftware.github.io/esw/$esw-version$/eswshell/esw-shell.html#using-custom-component-handlers) API to start our assembly with our custom handlers.

This assembly takes `sleep` command with `sleepInSeconds` (LongKey) parameter and returns `Started Response` immediately and then `Completed response` after the given sleep value.
Any other command other than `sleep` returns Completed Response.

Run this command inside esw-shell's ammonite shell:

```bash
spawnAssemblyWithHandler(
      "ESW.defaultAssembly",
      (ctx, cswCtx) =>
        new DefaultComponentHandlers(ctx, cswCtx) {
          override def onSubmit(runId: Id, controlCommand: ControlCommand): CommandResponse.SubmitResponse = {
            controlCommand.commandName.name match {
              case "sleep" =>
                val defaultSleepParam = LongKey.make("sleepInSeconds").set(5)
                val sleepParam = controlCommand.paramType.get("sleepInSeconds", LongKey).getOrElse(defaultSleepParam)
                cswCtx.timeServiceScheduler.scheduleOnce(UTCTime(UTCTime.now().value.plusSeconds(sleepParam.value(0)))) {
                  cswCtx.commandResponseManager.updateCommand(CommandResponse.Completed(runId))
                }
                CommandResponse.Started(runId)
              case _ => CommandResponse.Completed(runId)
            }
          }
        }
    )
```

This should start an assembly with prefix `ESW.defaultAssembly`.

## Add Submit Command Component

Assuming that you have followed atleast the @ref:[basic flow](./base-flow.md), we can go further and add submiting an command to an assembly feature in our UI.

Add `SubmitCommand.tsx` in `src/components` folder.

SubmitCommand.tsx looks like following:

@@@note
You can refer the source code of the completed application at any point in the course of this tutorial.
You can find it @link:[here](https://github.com/tmtsoftware/esw-gateway-ui-example)
@@@

Typescript
: @@snip [SubmitCommand.tsx](../../../../src/components/SubmitCommand.tsx) { #submit-command }

Add appropriate imports to the file.

Typescript
: @@snip [SubmitCommand.tsx](../../../../src/components/SubmitCommand.tsx) { #submit-command-imports }

Let's add the Form component's for the input fields within `<Card>{below code goes here}</Card>` component.

* CommandType - A Selectable with Options(Setup/Observe)
* ComponentType - A Selectable with Options(Assembly/HCD)
* Prefix - A Text Input (user to put Appropriate Prefix of earlier Started Assembly)
* Command - A Text Input (user to put command `sleep` or anything else)
* Sleep - A Optional field visible only when command is `sleep`.
* Submit - A Button to submit command.

Typescript
: @@snip [SubmitCommand.tsx](../../../../src/components/SubmitCommand.tsx) { #submit-command-form }

Add the following react states to hold the information of their corresponding user inputs.

The following snippet goes below `authData` state inside component.

Typescript
: @@snip [SubmitCommand.tsx](../../../../src/components/SubmitCommand.tsx) { #submit-command-states }

Now finally, add the `submit` action to be called on Submit button click(i.e. `onFinish` handle of Form component)

This method makes use of [command service](https://tmtsoftware.github.io/esw-ts/services/command-service.html) typescript client which sits on top of the gateway server Command Service routes.

Define this function adjacent to all the react state's inside component.

Typescript
: @@snip [SubmitCommand.tsx](../../../../src/components/SubmitCommand.tsx) { #submit-action }

## Render SubmitCommand result's

Add this helper function to render color corresponding to the SubmitResponse's type.

This function goes outside the component because it is independent of react component's state.

Typescript
: @@snip [SubmitCommand.tsx](../../../../src/components/SubmitCommand.tsx) { #color-helper }

## Integrate SubmitCommand Component

Finally, update Main.tsx to include `SubmitCommand` component.

Add the following `<SubmitCommand />` component below div's style tag.

Typescript
: @@snip [Main.tsx](../../../../src/components/Main.tsx) { #submit-command }

UI should render the following view at this moment.

![submit-command.png](../images/submit-command.png)

Fill in the values for all input fields and submit.

That's all we needed to do for adding an Submit command feature!!!

```text
prefix : ESW.defaultAssembly
command : sleep
sleep : 2
```

The UI should be updated with the following results.

First UI recieves started resposne.

![started](../images/started.png)

And after 2 seconds `Completed` response is received.

![completed](../images/Completed.png)

* Follow the tutorial @ref:[here](./subscribe-event.md) to add Subscribe Event Example.
