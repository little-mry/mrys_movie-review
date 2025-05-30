# Examination Databaser
## Maria Kjellholm

Ska finnas med:
- Exempelanrop
- Visa att data sparas i MongoDB


 ### Ang roller:
- Första användaren (mry) har manuellt ändrats till 'admin' i MongoDB Atlas
- Därefter skapas admin av andra admins

 ### Endpoints:
 ####  Auth:
 - **Alla** (utan token)
   - POST /register : Registrera en ny användare.
   - POST /login : Logga in en användare
 - **Enbart admin**
   - PATCH /:id/promote : Uppgradera en användare till admin

####  Movies:
**Alla** (utan token)
- GET /movies : Hämta en lista med alla filmer.
- GET /movies/:id : Hämta detaljer för en specifik film.
- GET /movies/:id/reviews : Hämta alla recensioner för en specifik film.
- GET /movies/ratings

**Enbart admin**
- POST /movies: Lägg till en ny film.
- PUT /movies/:id: Uppdatera en specifik film.
- DELETE /movies/:id: Ta bort en specifik film.

####  Reviews:
**Alla** (utan token)
- GET /reviews: Hämta en lista med alla recensioner.
- GET /reviews/:id: Hämta detaljer för en specifik recension.

**Enbart inloggade** (både user & admin)
- POST /reviews: Lägg till en ny recension.
- PUT /reviews/:id: Uppdatera en specifik recension.
- DELETE /reviews/:id: Ta bort en specifik recension.

