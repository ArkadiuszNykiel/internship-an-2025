from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from utils import load_tasks, add_task, delete_task, update_task, filter_tasks

app = Flask(__name__)
CORS(app) 

@app.route('/tasks', methods=['GET'])
def get_tasks():
    priority = request.args.get('priority')
    tasks = filter_tasks(priority=priority)
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    required_fields = ['title', 'due_date', 'priority']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing fields'}), 400
    task = add_task(data['title'], data['due_date'], data['priority'])
    return jsonify(task), 201

@app.route('/tasks/<task_id>', methods=['PUT'])
def edit_task(task_id):
    data = request.get_json()
    updated_task = update_task(
        task_id,
        title=data.get('title'),
        due_date=data.get('due_date'),
        priority=data.get('priority'),
        completed=data.get('completed')
    )
    if updated_task:
        return jsonify(updated_task)
    return jsonify({'error': 'Task not found'}), 404

@app.route('/tasks/<task_id>', methods=['DELETE'])
def remove_task(task_id):
    updated_tasks = delete_task(task_id)
    return jsonify(updated_tasks)

if __name__ == '__main__':
    app.run(debug=True)
