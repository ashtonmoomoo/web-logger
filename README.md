# web-logger
IDK about you guys, but when I'm working on an application with multiple components, I can't necessarily be bothered figuring out where a `console.log` or a `print` or `puts` or `System.out.println` or ... is going to show up.

So I made this dumb web logger that you can post your logs to to retrieve in one place.

## Usage
All you have to do is `POST` to `https://dumbweblogs.herokuapp.com/[someIdYouMakeUp]`, with a `body` in the form `'{ "content":"some log message" }'`. To access the log, do `GET` on the same URL you posted to.

NOTE: the `someIdYouMakeUp` is the only thing stopping someone else reading your log messages, so
1. Try make it relatively unique, and
1. Don't log any sensitive data.

### Example
Creating the log in Javascript:
```js
const toBeLogged = { hello: 'world', answer: 42 };
await fetch("https://dumbweblogs.herokuapp.com/bob", {
  method: "POST",
  body: JSON.stringify({ content: toBeLogged }),
});
```
Reading the log with `cURL` (and piping to `jq`, to format the response):
```sh
curl -X GET https://dumbweblogs.herokuapp.com/bob | jq .
```
which gives back
```json
{
  "created": "2022-08-20T05:00:45.566Z",
  "content": {
    "hello": "world",
    "answer": 42
  }
}
```

You can delete all your log messages by performing a `DELETE` request on your endpoint.

At the moment, it is only supported getting your most recent log message. I have plans to extend this.

## Considerations
The log messages are stored in a file on the server. At the moment, they will remain until the server is restarted (which, knowing me, happens reasonably often :P).

## Getting started
To develop locally, make sure you have a [Deno runtime installed](https://deno.land/manual@v1.26.1/getting_started/installation). Then, from the root directory of the project, run
```bash
deno run --allow-net --allow-env --allow-read --allow-write mod.ts
```
This will start a dev server on localhost:3000. You can change the port by prefixing the above command with PORT=some_port.

Why are the flags necessary?
- `--allow-net` is for the app to respond to and send requests over the network
- `--allow-env` is to read the `PORT` variable from the program's environment
- `--allow-read` and `--allow-write` is to enable the reading and writing of a local log file.