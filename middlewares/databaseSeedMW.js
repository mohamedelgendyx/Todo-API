const mongoose = require('mongoose');

const Todo = mongoose.model('Todo');

module.exports = async (request, response, next) => {
    try {
        const seedData = [
            {
                user: new mongoose.Types.ObjectId("649a16f62e81d0ebc98613fa"),
                todoItems: [
                    { todoDetails: "compelete that assignment" },
                    { todoDetails: "finsh a task", completed: true }
                ]
            },
            {
                user: new mongoose.Types.ObjectId("649a171a2e81d0ebc98613fc"),
                todoItems: [
                    { todoDetails: "finsh another task", completed: true }
                ]

            },
            {
                user: new mongoose.Types.ObjectId("649a17222e81d0ebc98613fe"),
                todoItems: [
                    { todoDetails: "task3" },
                    { todoDetails: "task4" }
                ]

            }
        ]
        await Todo.deleteMany();
        await Todo.insertMany(seedData);
        console.log('Database seeded successfully');
    } catch (error) {
        console.log('Error seeding data');
        throw error;
    }
}