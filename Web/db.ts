interface Todo {
  id: string;
  text: string;
  completed: boolean;
  due: Date | String;
  priority: string;
  project: string;
  checked: boolean;
}

type tasks = Todo[];

let date:Date | string = new Date().toISOString() // 2021-03-01T00:00:00.000Z

export const tasks: tasks = [
  { "id": "1", "text": "Finish project", "completed": true, "due":date, "priority": "P1", "project": "Inbox", "checked": false},
  { "id": "2", "text": "Go for a run", "completed": false, "due":date, "priority": "P2", "project": "Development", "checked": false},
  { "id": "3", "text": "Buy groceries", "completed": false, "due":date, "priority": "P2", "project": "School", "checked": false},
  { "id": "4", "text": "Submit homework", "completed": false, "due":date, "priority": "P1", "project": "School", "checked": false},
  { "id": "5", "text": "Write blog post", "completed": false, "due":date, "priority": "P3", "project": "Development", "checked": false},
  { "id": "6", "text": "Book flight tickets", "completed": false, "due":date, "priority": "P1", "project": "Inbox", "checked": false},
  { "id": "7", "text": "Prepare for presentation", "completed": false, "due":date, "priority": "P2", "project": "School", "checked": false},
  { "id": "8", "text": "Read book", "completed": false, "due":date, "priority": "P3", "project": "Development", "checked": false},
  { "id": "9", "text": "Clean the house", "completed": false, "due":date, "priority": "P1", "project": "Inbox", "checked": false},
  { "id": "10", "text": "Do laundry", "completed": false, "due":date, "priority": "P2", "project": "Inbox", "checked": false},
  { "id": "11", "text": "Buy birthday gift", "completed": false, "due":date, "priority": "P1", "project": "Development", "checked": false},
  { "id": "12", "text": "Pay bills", "completed": false, "due":date, "priority": "P2", "project": "School", "checked": false},
  { "id": "13", "text": "Attend meeting", "completed": false, "due":date, "priority": "P1", "project": "School", "checked": false},
  { "id": "14", "text": "Update portfolio", "completed": false, "due":date, "priority": "P3", "project": "Development", "checked": false},
  { "id": "15", "text": "Visit doctor", "completed": false, "due":date, "priority": "P1", "project": "Development", "checked": false},
  { "id": "16", "text": "Update resume", "completed": false, "due":date, "priority": "P2", "project": "School", "checked": false},
  { "id": "17", "text": "Plan vacation", "completed": false, "due":date, "priority": "P3", "project": "Inbox", "checked": false},
  { "id": "18", "text": "Call friend", "completed": false, "due":date, "priority": "P2", "project": "Development", "checked": false},
  { "id": "19", "text": "Organize closet", "completed": false, "due":date, "priority": "P1", "project": "Inbox", "checked": false},
  { "id": "20", "text": "Create budget plan", "completed": false, "due":date, "priority": "P3", "project": "School", "checked": false}
]

