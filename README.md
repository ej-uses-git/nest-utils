# nest-utils

## TranslateExceptions Exception Filter

Filter which returns a different JSON object for errors than NestJS's default,
where the `statusCode` remains the same, but the `message` is translated to Hebrew.

### Usage:

In a NestJS project's `main.ts` file (or whichever file has the `bootstrap` function), in the `bootstrap` function,
add the following lines before `app.listen()`:

```
const httpAdapterHost = app.get(HttpAdapterHost);
app.useGlobalFilters(new TranslateExceptions(httpAdapterHost));
```

(You'll need to import `TranslateExceptions` from `@ejshafran/nest-utils`
and `HttpAdapterHost` from `@nestjs/core`.

## translateStatus function

The non-NestJS implementation that translates the status code;
takes the status in number form as argument and returns the Hebrew text
for that Http Exception.
