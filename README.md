Split App - Expense Sharing Backend

   A simple backend system to track shared group expenses and automate settlements between users — built with Node.js, Express, and MongoDB.

   Inspired by apps like Splitwise, this API allows groups (like roommates, travel buddies, or friends) to:
- Add shared expenses
- Track individual balances
- Calculate optimized settlements


   Live Demo (Railway)

  Deployed API Base URL:  
https://spiltapp-production.up.railway.app


   How to Run Locally

 Prerequisites
- Node.j
- MongoDB Atlas (or local MongoDB)

 1. Clone the repo

```bash
git clone https://github.com/moonpie1941/spiltapp.git
cd spiltapp
```

 2. Install dependencies

```bash
npm install
```

 3. Create `.env` file

```env
PORT=3000
mongodb+srv://srushtiladkat1941:SrushtiLadkat@cluster.kzr30er.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
```

 4. Run the server

```bash
node app.js
```

Server will be running at: `http://localhost:3000`


API Documentation:

   Add Expense (POST)
URL: `https://spiltapp-production.up.railway.app/expenses`
Method: POST
Body (JSON):

```json
{
  "amount": 600,
  "description": "Dinner",
  "paid_by": "Shantanu",
  "participants": ["Shantanu", "Sanket", "Om"],
  "split_type": "equal"
}
```

  Get All Expenses (GET)
URL: `https://spiltapp-production.up.railway.app/expenses`
Method: GET

  Update Expense (PUT)
URL: `https://spiltapp-production.up.railway.app/expenses/<id>`
Method: PUT
Replace `<id>` with a real MongoDB ObjectId.

  Delete Expense (DELETE)
URL: `https://spiltapp-production.up.railway.app/expenses/<id>`
Method: DELETE


 Settlements & People:

  Get All People
URL: `https://spiltapp-production.up.railway.app/people`
Method: GET

  Get Balances
URL: `https://spiltapp-production.up.railway.app/balances`
Method: GET

  Get Settlements
URL: `https://spiltapp-production.up.railway.app/settlements`
Method: GET



 Expense Management

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| GET    | `/expenses`          | Get all expenses          |
| POST   | `/expenses`          | Add new expense           |
| PUT    | `/expenses/:id`      | Update an expense         |
| DELETE | `/expenses/:id`      | Delete an expense         |

Sample Payload (POST /expenses):
```json
{
  "amount": 600,
  "description": "Dinner",
  "paid_by": "Shantanu",
  "participants": ["Shantanu", "Sanket", "Om"],
  "split_type": "equal"
}
```



 Settlement & People

| Method | Endpoint             | Description                     |
|--------|----------------------|---------------------------------|
| GET    | `/people`            | List all people in the group    |
| GET    | `/balances`          | Get balances for each person    |
| GET    | `/settlements`       | Get optimized transactions      |

---

 Settlement Logic Explained

1. Calculate Net Balance for Each Person:
   - Total paid by person - total owed based on split.

2. Example Output from `/balances`:
```json
{
  "Shantanu": 150,
  "Sanket": -50,
  "Om": -100
}
```

3. Minimize Transactions:
   - Apply greedy algorithm to pair debtors and creditors.
   - Example from `/settlements`:
```json
[
  { "from": "Om", "to": "Shantanu", "amount": 100 },
  { "from": "Sanket", "to": "Shantanu", "amount": 50 }
]
```

Postman Collection

  Includes:
- All endpoints
- Sample test data: Shantanu, Sanket, Om
- Edge case testing
- Validations

Gist Link:  

(https://gist.github.com/moonpie1941/20be427d0ecc8bcc514cd94f57d29279)



Known Limitations

- Names like `Shantanu`, `Om`, etc., are assumed unique (not validated case-insensitively).
- No user authentication or session management (for simplicity).
- No pagination for expenses list.
- Uses in-memory greedy settlement — not guaranteed to be minimal in complex graphs.


Future Improvements (Optional)

- Add user authentication (JWT or OAuth)
- Support recurring expenses
- Add categories and spending analytics
- Create a frontend dashboard (React or plain HTML)



Author

Srushti Ladkat  
[GitHub](https://github.com/moonpie1941)


