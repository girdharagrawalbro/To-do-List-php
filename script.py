import requests
from datetime import datetime, timedelta

ONE_SIGNAL_APP_ID = "37820247-c107-4291-b13b-f444c0b16071"
ONE_SIGNAL_REST_API_KEY = "YOUR_REST_API_KEY"

def get_tasks():
    # Function to fetch tasks from your database
    # This should return a list of tasks with user_id, title, dueDate, and status
    return [
        {
            "user_id": "12345",
            "title": "Complete project report",
            "dueDate": "2024-05-25T09:00:00Z",
            "status": "pending"
        }
    ]

def send_notification(task):
    headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": f"Basic {ONE_SIGNAL_REST_API_KEY}",
    }
    payload = {
        "app_id": ONE_SIGNAL_APP_ID,
        "contents": {"en": f"Reminder: {task['title']} is due today"},
        "filters": [{"field": "tag", "key": "user_id", "relation": "=", "value": task['user_id']}],
    }
    response = requests.post("https://onesignal.com/api/v1/notifications", headers=headers, json=payload)
    print(response.status_code, response.json())

def check_and_send_reminders():
    tasks = get_tasks()
    now = datetime.utcnow()
    for task in tasks:
        due_date = datetime.strptime(task['dueDate'], "%Y-%m-%dT%H:%M:%SZ")
        if task['status'] == 'pending' and due_date.date() == now.date():
            send_notification(task)

if __name__ == "__main__":
    check_and_send_reminders()
