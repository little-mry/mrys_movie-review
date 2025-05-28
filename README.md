#Examination Databaser
##Maria Kjellholm

Endpoints:
Auth:
Alla (utan token)
- POST /register: Registrera en ny användare.
- POST /login: Logga in en användare

Movies:
Alla (utan token)
- GET /movies: Hämta en lista med alla filmer.
- GET /movies/:id: Hämta detaljer för en specifik film.
- GET /movies/:id/reviews: Hämta alla recensioner för en specifik film.
- GET /movies/ratings

//Enbart admin:
- POST /movies: Lägg till en ny film.
- PUT /movies/:id: Uppdatera en specifik film.
- DELETE /movies/:id: Ta bort en specifik film.

Reviews:
Alla (utan token)
- GET /reviews: Hämta en lista med alla recensioner.
- GET /reviews/:id: Hämta detaljer för en specifik recension.

//Enbart inloggade (både user & admin)
- POST /reviews: Lägg till en ny recension.
- PUT /reviews/:id: Uppdatera en specifik recension.
- DELETE /reviews/:id: Ta bort en specifik recension.

Ska finnas med:
- Exempelanrop
- Visa att data sparas i MongoDB
