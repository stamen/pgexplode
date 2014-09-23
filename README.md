# pgexplode

Uses [`pg-connection-string`](https://github.com/iceddev/pg-connection-string)
to assemble [`libpq` environment
variables](http://www.postgresql.org/docs/9.3/interactive/libpq-envars.html).

## Usage

Run `pgexplode` in a subshell along with the command that consumes the
variables it sets in order to avoid polluting your environment:

```bash
(export $(DATABASE_URL="postgres://host/db?ssl=true" pgexplode | xargs) && psql)
```
