const app = require('express')();
const fs = require('fs');
const PORT = 3000;

// GET request #1   
app.get('/random-pizza-joke', (req, res) => {
    fs.readFile('pizza-jokes.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to read jokes file' });
        }
        const jokes = JSON.parse(data);
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const randomJoke = jokes[randomIndex];
        res.status(200).send({ joke: randomJoke });
    });
});

// GET request #2
app.get('/random-pizza-fact', (req, res) => {
    fs.readFile('pizza-facts.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to read facts file' });
        }
        const facts = JSON.parse(data);
        const randomIndex = Math.floor(Math.random() * facts.length);
        const randomFact = facts[randomIndex];
        res.status(200).send({ fact: randomFact });
    });
});

// GET request #3
app.get('/pizza-fact/:id', (req, res) => {
    fs.readFile('pizza-facts.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to read facts file' });
        }
        const facts = JSON.parse(data);
        const factId = parseInt(req.params.id, 10);
        if (factId > 0 && factId <= facts.length) {
            res.status(200).send({ fact: facts[factId - 1] });
        } else {
            res.status(404).send({ error: 'Fact not found' });
        }
    });
});

// GET request #4
app.get('/pizza-joke/:id', (req, res) => {
    fs.readFile('pizza-jokes.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to read jokes file' });
        }
        const jokes = JSON.parse(data);
        const jokeId = parseInt(req.params.id, 10);
        if (jokeId > 0 && jokeId <= jokes.length) {
            res.status(200).send({ joke: jokes[jokeId - 1] });
        } else {
            res.status(404).send({ error: 'Joke not found' });
        }
    });
});

// POST request #1
app.post('/pizza-opinion', (req, res) => {
    const pizzaChain = req.body.pizzaChain;
    if (!pizzaChain) {
        return res.status(400).send({ error: 'Pizza chain is required' });
    }

    fs.readFile('pizza-opinions.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to read opinions file' });
        }
        const opinions = JSON.parse(data);
        const opinion = opinions[pizzaChain];
        if (opinion) {
            res.status(200).send({name:opinion.name, comments: opinion.comments, ratings: opinion.ratings });
        } else {
            res.status(404).send({ error: 'Pizza chain not found' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running!!!!`);
});

