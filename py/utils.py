import json
import uuid
from datetime import datetime

TASKS_FILE = 'tasks.json'

def load_tasks():
    try:
        with open(TASKS_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_tasks(tasks):
    with open(TASKS_FILE, 'w') as f:
        json.dump(tasks, f, indent=4)

def add_task(title, due_date, priority):
    tasks = load_tasks()
    now = datetime.utcnow().isoformat()
    task = {
        'id': str(uuid.uuid4()),
        'title': title,
        'due_date': due_date,
        'priority': priority,
        'completed': False,
        'created_at': now,
        'updated_at': now
    }
    tasks.append(task)
    save_tasks(tasks)
    return task

def delete_task(task_id):
    tasks = load_tasks()
    tasks = [t for t in tasks if t['id'] != task_id]
    save_tasks(tasks)
    return tasks

def update_task(task_id, title=None, due_date=None, priority=None, completed=None):
    tasks = load_tasks()
    for task in tasks:
        if task['id'] == task_id:
            if title is not None:
                task['title'] = title
            if due_date is not None:
                task['due_date'] = due_date
            if priority is not None:
                task['priority'] = priority
            if completed is not None:
                task['completed'] = completed
            task['updated_at'] = datetime.utcnow().isoformat()
            break
    save_tasks(tasks)
    return task if 'task' in locals() else None

def filter_tasks(priority=None):
    tasks = load_tasks()
    if priority:
        tasks = [task for task in tasks if task['priority'].lower() == priority.lower()]
    return tasks
