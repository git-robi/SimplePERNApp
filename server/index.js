const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//create a todo

app.post("/todos", async (req, res) => {
    try {
         const { description } = req.body;
         const newTodo = await db.query(
            "INSERT INTO todo(description) VALUES($1) RETURNING *",
            [description]
        );
        
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await db.query
        ("SELECT * FROM todo");
        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message);
    }
}
);

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await db.query
        ("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await db.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated");
    } catch (err) {
        console.log(err.message);
    }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const deleteTodo = await db.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        console.log(deleteTodo);
        res.json("Todo was deleted");
        // --- other option: ---
        // res.status(204);
        // res.send();
        // and then you don't return a body 
    }catch (err) {
        console.log(err.message);
    }
}); 

app.listen(4242, () => {
    console.log("server has started on port 4242")
});