const http = require('http');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // For unique IDs
// Install uuid: npm install uuid

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/todos' && req.method === 'GET') {
        // Get all todos
        fs.readFile('./todos.json', 'utf8', (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });

    } else if (req.url.match(/\/todos\/([0-9a-zA-Z-]+)/) && req.method === 'GET') {
        // Get todo by id
        const id = req.url.split('/')[2];
        fs.readFile('./todos.json', 'utf8', (err, data) => {
            if (err) throw err;
            const todos = JSON.parse(data);
            const todo = todos.find(t => t.id === id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todo));
        });

    } else if (req.url === '/todos' && req.method === 'POST') {
        // Create new todo
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { title, completed } = JSON.parse(body);
            fs.readFile('./todos.json', 'utf8', (err, data) => {
                if (err) throw err;
                const todos = JSON.parse(data);
                const newTodo = {
                    id: uuidv4(),
                    title,
                    completed
                };
                todos.push(newTodo);
                fs.writeFile('./todos.json', JSON.stringify(todos, null, 2), err => {
                    if (err) throw err;
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newTodo));
                });
            });
        });

    } else if (req.url.match(/\/todos\/([0-9a-zA-Z-]+)/) && req.method === 'PUT') {
        // Update todo
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { title, completed } = JSON.parse(body);
            fs.readFile('./todos.json', 'utf8', (err, data) => {
                if (err) throw err;
                let todos = JSON.parse(data);
                todos = todos.map(todo => {
                    if (todo.id === id) {
                        if (title !== undefined) todo.title = title;
                        if (completed !== undefined) todo.completed = completed;
                    }
                    return todo;
                });
                fs.writeFile('./todos.json', JSON.stringify(todos, null, 2), err => {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Todo updated' }));
                });
            });
        });

    } else if (req.url.match(/\/todos\/([0-9a-zA-Z-]+)/) && req.method === 'DELETE') {
        // Delete todo
        const id = req.url.split('/')[2];
        fs.readFile('./todos.json', 'utf8', (err, data) => {
            if (err) throw err;
            let todos = JSON.parse(data);
            todos = todos.filter(todo => todo.id !== id);
            fs.writeFile('./todos.json', JSON.stringify(todos, null, 2), err => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Todo deleted' }));
            });
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
