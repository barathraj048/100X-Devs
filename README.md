

# 🚀 **Real-time Code Execution System**  

> **A scalable, real-time online judge system inspired by LeetCode & Codeforces.**  

## 🌍 **Overview**  
This system enables real-time **code execution & problem-solving**, where users submit code, it gets processed in a queue, executed by worker nodes, and results are delivered instantly via **WebSockets**.  
![Screenshot 2025-03-14 151819](https://github.com/user-attachments/assets/fad28da3-a2ca-436e-ae2a-19f2555d7714)

---

## ⚙️ **System Architecture**  
🖥️ **Client (Browser)**  
- Users submit code with:
  ```json
  {
    "problem_id": 1,
    "code": "your_solution_here",
    "language": "java"
  }
  ```
- Sends the request to the **Primary Backend**.

🚀 **Primary Backend**  
- Handles user submissions.  
- Pushes execution requests into the **Job Queue**.

📌 **Job Queue (Redis Queue)**  
- Stores execution requests in order.  
- Ensures efficient processing with **scalable workers**.

🛠️ **Worker Nodes (W1, W2, etc.)**  
- Fetch jobs from the queue.  
- Execute code in an **isolated environment**.  
- Return execution results (e.g., ✅ Accepted, ❌ Time Limit Exceeded).  

📡 **WebSocket Server**  
- Listens for execution results from workers.  
- Sends **real-time updates** back to users.

---

## 🔄 **Flow Diagram**  
📌 **Step-by-step execution flow:**  
1️⃣ User submits code in the **browser**.  
2️⃣ The backend pushes the job into the **queue**.  
3️⃣ **Workers** fetch jobs and execute them securely.  
4️⃣ Results are sent to **WebSocket**, then to the **user**.  

---

## 🛠️ **Tech Stack**  
| Component        | Technology Used    |
|-----------------|--------------------|
| 🌐 Backend      | **Node.js + Express**  |
| 🔄 Queue        | **Redis (Pub/Sub + Job Queue)**  |
| 📡 Real-time    | **WebSockets (ws)**  |
| 🖥️ Execution    | **Worker Nodes (Docker/Sandboxed Env)**  |

---

## 🚀 **Key Features**  
✅ **Real-time code execution** 🕒  
✅ **Scalable worker-based processing** 🔥  
✅ **WebSocket-based live updates** 📡  
✅ **Queue-based execution system** 📌  
✅ **Multi-language support** (Java, Python, C++, etc.) 🛠️  

---

## 📌 **Future Improvements**  
- 🔹 **Scalability:** Auto-scaling workers with Kubernetes.  
- 🔹 **Caching:** Store results for common test cases.  
- 🔹 **Security:** Isolated execution for preventing malicious code.  

---

💡 **Inspired by competitive coding platforms like LeetCode & Codeforces.**  
💻 **Built for efficiency, scalability & real-time feedback.**  

🚀 **Let’s code & optimize!**  

---
