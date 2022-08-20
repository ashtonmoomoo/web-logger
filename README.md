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

At the moment, it is only supported getting your most recent log message. I have plans to extend this.

## Considerations
The log messages are stored in a file on the server. At the moment, they will remain until the server is restarted (which, knowing me, happens reasonably often :P). I plan to add the ability for a user to delete their logs, as well as automatically deleting old logs (I'm thinking logs last ~1 hour).
