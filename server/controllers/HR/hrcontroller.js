const approveTaskReason = async (req, res) => {
    try {
      const { taskId, isSatisfied, response } = req.body; // Accept taskId, isSatisfied, and response
      const hrId = req.user._id; // HR's ID from the authenticated user
  
      const task = await Task.findById(taskId).populate('company');
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      // Update satisfaction and response
      task.hr_satisfaction = isSatisfied;
      if (!isSatisfied && response) {
        // If HR is not satisfied, reduce the employee's score
        const employee = await User.findById(task.created_by);
        const deduction = task.importancy === 'high' ? 6 : task.importancy === 'medium' ? 4 : 2;
        employee.score -= deduction;
        await employee.save();
      }
      await task.save();
  
      res.json({ message: 'Task response updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

  const getAllTasksByCompany = async (req, res) => {
    try {
      const hrId = req.user._id;
      const hr = await User.findById(hrId);
      if (!hr || hr.role !== 'HR') return res.status(403).json({ message: 'Access denied' });
  
      const tasks = await Task.find({ company: hr.company }).populate('created_by');
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };

  
  const getUserStatistics = async (req, res) => {
    try {
      const hrId = req.user._id;
      const hr = await User.findById(hrId);
      if (!hr || hr.role !== 'HR') return res.status(403).json({ message: 'Access denied' });
  
      const users = await User.find({ company: hr.company });
      const tasks = await Task.find({ company: hr.company });
  
      const stats = users.map(user => {
        const completedTasks = tasks.filter(task =>
          task.sub_tasks.every(sub => sub.assigned_to?.toString() === user._id.toString() && sub.status === 'completed')
        );
        return {
          userId: user._id,
          name: user.name,
          score: user.score,
          tasksCompleted: completedTasks.length,
          archivedTasks: user.archived_tasks.length,
          details: user,
        };
      });
  
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  