import { Router } from "express";

const router = Router();

//Post a review
router.post('/')

//Get all reviews
router.get('/')

//Get details for a review by id
router.get('/:id')

//Change a review by id
router.put('/:id')

//Delete a review by id
router.delete('/:id')

export default router;
