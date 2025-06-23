const Task = require('../models/Task');

const taskController = {

  async createTask(req, res) {
    try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ message: 'El título es obligatorio' });

      const newTask = await Task.create({ title, completed: false });
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllTasks(req, res) {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getTaskById(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async markCompleted(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

      task.completed = true;
      await task.save();

      res.json({ message: 'Tarea marcada como completada', task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateTask(req, res) {
    try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ message: 'El título es obligatorio' });

      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

      task.title = title;
      await task.save();

      res.json({ message: 'Título actualizado', task });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteTask(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

      await Task.findByIdAndDelete(req.params.id);

      res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = taskController;
