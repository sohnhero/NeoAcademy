# JSON Server Configuration

This project uses [JSON Server](https://github.com/typicode/json-server) to provide a mock REST API for development and testing.

## Available Endpoints

The server runs on `http://localhost:3001` and provides the following endpoints:

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get a specific course
- `POST /courses` - Create a new course
- `PUT /courses/:id` - Update a course
- `PATCH /courses/:id` - Partially update a course
- `DELETE /courses/:id` - Delete a course

### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get a specific student
- `POST /students` - Create a new student
- `PUT /students/:id` - Update a student
- `DELETE /students/:id` - Delete a student

### Badges
- `GET /badges` - Get all badges
- `GET /badges/:id` - Get a specific badge

### Insights
- `GET /insights` - Get all LLM insights
- `GET /insights/:id` - Get a specific insight

### Pending Reviews
- `GET /pendingReviews` - Get all pending reviews
- `GET /pendingReviews/:id` - Get a specific review
- `PATCH /pendingReviews/:id` - Update review status

### Activity Log
- `GET /activityLog` - Get all activity logs
- `GET /activityLog?studentId=:id` - Get logs for a specific student
- `POST /activityLog` - Add a new activity log

### KPIs
- `GET /kpis` - Get all KPIs
- `GET /kpis/coach` - Get coach KPIs
- `GET /kpis/admin` - Get admin KPIs

### Alerts
- `GET /alerts` - Get all alerts
- `GET /alerts?type=:type` - Filter alerts by type (critical, warning, info)

## Query Parameters

JSON Server supports various query parameters:

### Filtering
```
GET /students?status=active
GET /courses?category=blockchain
GET /alerts?type=critical
```

### Pagination
```
GET /students?_page=1&_limit=10
```

### Sorting
```
GET /students?_sort=score&_order=desc
GET /courses?_sort=title&_order=asc
```

### Full-text Search
```
GET /students?q=Alice
```

### Relationships
```
GET /students?_embed=activityLog
GET /courses?_expand=modules
```

## Running the Server

### Start JSON Server Only
```bash
npm run server
```

### Start with Simulated Network Delay (500ms)
```bash
npm run server:delay
```

### Start Both Frontend and Backend
```bash
npm run dev:all
```

## Data Persistence

All changes made through the API are automatically saved to `db.json`. The file serves as both the initial data source and the persistent storage.

## Example Usage

### Fetch all courses
```javascript
fetch('http://localhost:3001/courses')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Update a student's progress
```javascript
fetch('http://localhost:3001/students/s1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ progress: 90 })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Create a new activity log
```javascript
fetch('http://localhost:3001/activityLog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 'a4',
    studentId: 's1',
    type: 'module_completion',
    date: new Date().toISOString(),
    description: 'Module validé: Security Audit',
    score: 95
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## CORS

JSON Server automatically handles CORS, so you can make requests from your frontend without any configuration.

## Custom Routes (Optional)

You can create a `routes.json` file to define custom routes:

```json
{
  "/api/*": "/$1",
  "/students/:id/activities": "/activityLog?studentId=:id"
}
```

Then run: `json-server --watch db.json --routes routes.json --port 3001`
