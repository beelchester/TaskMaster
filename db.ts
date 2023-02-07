interface Todo {
  id: number;
  text: string;
  completed: boolean;
  due: string;
  priority: string;
  project: string;
}

type tasks = Todo[];

export const tasks: tasks = [
  { id: 1, text: "Finish project", completed: false, due: "Today", priority: "P1", project: "Inbox" },
  { id: 2, text: "Go for a run", completed: false, due: "Tommorow", priority: "P2", project: "Development" },
  { id: 3, text: "Buy groceries", completed: false, due: "Today", priority: "P2", project: "School" },
  { id: 4, text: "Submit homework", completed: false, due: "Tomorrow", priority: "P1", project: "School" },
  { id: 5, text: "Write blog post", completed: false, due: "Today", priority: "P3", project: "Development" },
  { id: 6, text: "Book flight tickets", completed: false, due: "This week", priority: "P1", project: "Inbox" },
  { id: 7, text: "Prepare for presentation", completed: false, due: "Tomorrow", priority: "P2", project: "School" },
  { id: 8, text: "Read book", completed: false, due: "This week", priority: "P3", project: "Development" },
  { id: 9, text: "Clean the house", completed: false, due: "Today", priority: "P1", project: "Inbox" },
  { id: 10, text: "Do laundry", completed: false, due: "Tomorrow", priority: "P2", project: "Inbox" },
  { id: 11, text: "Buy birthday gift", completed: false, due: "This week", priority: "P1", project: "Development" },
  { id: 12, text: "Pay bills", completed: false, due: "Today", priority: "P2", project: "School" },
  { id: 13, text: "Attend meeting", completed: false, due: "Tomorrow", priority: "P1", project: "School" },
  { id: 14, text: "Update portfolio", completed: false, due: "Today", priority: "P3", project: "Development" },
  { id: 15, text: "Visit doctor", completed: false, due: "This week", priority: "P1", project: "Development" },
  { id: 16, text: "Update resume", completed: false, due: "Tomorrow", priority: "P2", project: "School" },
  { id: 17, text: "Plan vacation", completed: false, due: "This week", priority: "P3", project: "Inbox" },
  { id: 18, text: "Call friend", completed: false, due: "Today", priority: "P2", project: "Development" },
  { id: 19, text: "Organize closet", completed: false, due: "Tomorrow", priority: "P1", project: "Inbox" },
  { id: 20, text: "Create budget plan", completed: false, due: "Today", priority: "P3", project: "School" }
]

