# test_utils.py
import unittest
from unittest.mock import patch, mock_open
import utils
import json
from datetime import datetime

class TestUtils(unittest.TestCase):

    def setUp(self):
        self.sample_task = {
            'id': '123',
            'title': 'Test Task',
            'due_date': '2025-05-10',
            'priority': 'high',
            'completed': False,
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }

    @patch('utils.open', new_callable=mock_open, read_data='[]')
    def test_load_tasks_empty(self, mock_file):
        tasks = utils.load_tasks()
        self.assertEqual(tasks, [])

    @patch('utils.open', new_callable=mock_open)
    def test_save_tasks(self, mock_file):
        tasks = [self.sample_task]
        utils.save_tasks(tasks)
        mock_file().write.assert_called()  # Ensure writing occurred

    @patch('utils.load_tasks', return_value=[])
    @patch('utils.save_tasks')
    def test_add_task(self, mock_save, mock_load):
        task = utils.add_task("New Task", "2025-05-15", "medium")
        self.assertEqual(task["title"], "New Task")
        self.assertEqual(task["priority"], "medium")
        self.assertFalse(task["completed"])
        self.assertTrue("id" in task and "created_at" in task)

    @patch('utils.load_tasks', return_value=[{'id': '123'}])
    @patch('utils.save_tasks')
    def test_delete_task(self, mock_save, mock_load):
        remaining = utils.delete_task("123")
        self.assertEqual(remaining, [])
        mock_save.assert_called_once_with([])

    @patch('utils.load_tasks', return_value=[
        {'id': '123', 'title': 'Old', 'due_date': '2025-01-01', 'priority': 'low', 'completed': False, 'created_at': '...', 'updated_at': '...'}
    ])
    @patch('utils.save_tasks')
    def test_update_task(self, mock_save, mock_load):
        updated = utils.update_task("123", title="Updated", priority="high", completed=True)
        self.assertEqual(updated["title"], "Updated")
        self.assertEqual(updated["priority"], "high")
        self.assertTrue(updated["completed"])

    @patch('utils.load_tasks', return_value=[
        {'id': '1', 'priority': 'low'},
        {'id': '2', 'priority': 'High'},
        {'id': '3', 'priority': 'medium'}
    ])
    def test_filter_tasks(self, mock_load):
        filtered = utils.filter_tasks(priority='high')
        self.assertEqual(len(filtered), 1)
        self.assertEqual(filtered[0]["id"], '2')

if __name__ == '__main__':
    unittest.main()
