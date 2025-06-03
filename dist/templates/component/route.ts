import { Router } from 'express';

const router = Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Example of a parameterized route
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`You requested the item with id: ${id}`);
});

// Export the router
export default router;