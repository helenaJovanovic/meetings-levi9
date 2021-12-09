### Run in development mode:

`npm run dev`

<br>
<br>
<br>

# API description:

Use local time in any format.

Don't put time that has Z at the end, that means UTC time zone. That way backend will be capable of calculating the time zone based on the local time.
Mongo only stores utc, but if you give it local time server can store the time zone and return the difference back to you so time can be converted again 
into local time.

## Reservations

#

### GET ALL 
on url/reservations/getAll

Local example: GET on this url http://localhost:3000/reservations/getAll

#

### GET BY TERRAIN ID 
on url/reservations/getByTerrainId/:terrainID

Local example: GET on this url http://localhost:3000/reservations/getByTerrainId/61a68ba36d21c84b40fe8b4b

#

### GET BY USERNAME
on url/reservations/getByUsername/new

Local example: GET on http://localhost:3000/reservations/getByUsername/new

where new is the username

#

### GET BY RESERVATION ID
on url/reservations/getByReservationId/:reservationId

Local example: GET on http://localhost:3000/reservations/getByReservationId/61a8d23c322a9cf8fae1d086
#

### POST 
on url/reservations/addReservation 

Add a new reservation

Body of request in json:

`
{ 
    "reservationDateTime": "2012-11-04T13:00",
    "Username": "username", 
    "terrainName": "Veliki fudbalski teren"
}
`

Terrain name is from the list of available terrain names.

#

### PUT (use for updating an existing reservation)
on url/reservations/changeReservation/:reservationId

Body of req with one field change:
`
{
    "price": "new value",
    "_id": "reservationId"
}
`

You can add any field you want to change.

Id in url and body must match.

Local example:

http://localhost:3000/reservations/changeReservation/61a8d0fcd7b70d8284da597d

with body:

`
{
    "reservation_date_time": "2012-11-04T12:00",
    "user_id": "61a622f418c8959ef110f822",
    "_terrain_id": "61a68ba36d21c84b40fe8b4b",
    "price": 0,
    "_id": "61a8d0fcd7b70d8284da597d"
}
`

#

### DELETE on url/reservations/removeReservation/:reservationId

Example:

DELETE on http://localhost:3000/reservations/removeReservation/61a66cff220bc60b9145f47f

#

## Terrains

### GET ALL
GET on url url/terrains/getAll

Local example: http://localhost:3000/terrains/getAll

#

### GET BY TERRAIN ID
GET on url/terrains/getByTerrainId/:terrainId

Local example: http://localhost:3000/terrains/getByTerrainId/61a6343c26adc54c935f809f

#

### DELETE BY TERRAIN ID
DELETE on url/terrains/terrainDelete/:terrainId

Local Example: 
DELETE on http://localhost:3000/terrains/terrainDelete/61a6343c26adc54c935f809f

#

### PUT (for updating)
PUT on url/terrains/terrainPut/:terrainsId

Body of request:

Ids must match.

Add only the fields you want to change.

`
{
    "_id": "terrainsID",
    "Name": "Promenjena vrednost",
    "Sport": "Promenjena vrednost",
    "Price": brojevnaVrednost
}
`

Local example: http://localhost:3000/terrains/terrainPut/61a68bd77346a50c8ccf7e90

#

### POST
POST on url/terrains/terrainPost/

Reqest body:

{
    "Name": "Pingpong sto",
    "Sport": "Pingpong",
    "Price": 250
}

Add a new terrain

#

# Users

### GET 
GET with userId returns username

url/users/61a622f418c8959ef110f822

response: string with username

### GET ALL USERS

/url/users/

Response example

`
...
{
        "_id": "619e450c9c36fb9558a47ebc",
        "Username": "test",
        "FirstName": "test",
        "LastName": "test",
        "Email": "test@test.com",
        "Role": "user",
        "__v": 0
    }
...
`
