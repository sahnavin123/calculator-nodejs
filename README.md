# Calculator API Documentation

This calculator application provides a set of APIs to perform basic mathematical operations, undo the last operation, and reset the calculator.

## Installation

To set up and run the calculator API locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Steps

**Clone the Repository:**

```
git clone https://github.com/sahnavin123/calculator-nodejs.git
```

### Install the dependency

```
npm install
```

### set up environment variables

```
PORT=YOUR_PORT_NUMBER

```

### Run the Application

```
npm start  
``` 

The application will be accessible at http://localhost:8000

### To test the Application run 
```
npm run test
```

## API Endpoints

### 1. Initialize Calculator

**Endpoint:** `POST /api.com/init`

**Request:**

```
{
  "operator": "add",
  "num1": 3,
  "num2": 4
}
```

**Response**

```
{
  "result": 7,
  "totalOps": 1,
  "id": 123
}
```

### 2. Perform Operation

**Endpoint:** `POST /api.com/operation`

**Request**

```
{
  "operator": "add",
  "num": 2,
  "id": 123
}

```

**Response**

```
{
  "operator": "add",
  "num": 2,
  "id": 123
}

```

### 3. Undo Last Operation

**Endpoint:** `PUT /api.com/undo`

**Request**

```
{
  "id": 123
}

```

**Response**

```
{
  "result": 7,
  "totalOps": 1
}

```

### 4. Reset Calculator

**Endpoint:** `GET /api.com/reset`

**Request**

```
{
  "id": 123
}
```

**Response**

```
{
  "success": true,
  "message": "Calculator 223 is now reset"
}
```
