import { Router } from "express";

const router = Router();

//Post a movie
router.post('/')

//Get all movies
router.get('/')

//Get a movie by id
router.get('/:id')

//Change a movie by id
router.put('/:id')

//Delete a movie by id
router.delete('/:id')

//Get a movie's reviews by id
router.get('/:id/reviews')


export default router;
