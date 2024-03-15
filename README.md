
## Description

Nest app for interacting with engineering test eurocamp api.

## Running the app

Firstly, make sure the engineering test app is running on localhost.

```bash
# development
$ docker-compose up

```

If for some reason it doesn't connect, please amend the EUROCAMP_URL environment variable in the docker-compose.yml file.

## Test

```bash
# unit tests
$ docker-compose run --rm app npm test

```

# Note regarding comments field for bookings

Whilst comments appear to be optional in the api, the table field in the database can not be null.

I found this sql query:

    ALTER TABLE IF EXISTS public.bookings
    ADD COLUMN comments character varying COLLATE pg_catalog."default" NOT NULL;