# Leave Management System 

This is IFQ636 Assign1, built on Task Manager starter. Allows employees the ability to request, view and cancel leave requets. Managers can then go and approve and reject with a reason needed. 

# Deployment details
EC2 instance: i-05ef7db8a9c3ac2cf (AALMM), Sydney region, QUT AWS account
Live URL: http://<public IPv4 of the AALMM instance> (the IP changes every time the instance starts, see below)


# How it Works
1. Pick employee or manager when you register
2. Comprised of React frontend, Node/Express backend, MongoDB Atlas, JWT login
3. Approve/reject option is for managers only. THis was added in after a self review. 
4. nginx on port port 80 sends /api to backend (5001), everything else is sent to the frontend (3000), both run with pm2. 

# Running Locally 
1. Clone the repo - git clone https://github.com/AlexA-QUT/leave-management-system.git
2. Make backend/.env from .env.example (MONGO_URI, JWT_SECRET, PORT)
3. Install and run 
    npm run install-all 
    npm run dev 
4. Open localhost:3000

# Deploying
1. Ubuntu t2.micro, SYdney, student security groups, IFQ636-EC2-Role
2. SSH and HTTP rules for my IP, Atlas network access opened to any IP so a new server IP still connects
3. Installed, node, npm, nginx, pm2
4. Cloned repo, made .env, started backend and frontend with pm2. 
5. Nginx config, then restart
6. Set pm2 to start the app automatically when the server boots


# limitations 
1. HTTP only allowed from my IP (QUT actually removes open rules)
2. No Leaave balances, as this was descoped 
3. No overlapping check, and no emails. 
4. HTTP and not HTTPS
5. IP changes is the instance is stopped. 

# Important - Starting the app on AWS if the app is offline
QUT AWS automatically stops EC2 instances (overnight), so the app might be offline when you check in. TO START AGAIN: 
1. Go to EC2 in the QUT AWS console (Sydney region)
2. Find instance i-05ef7db8a9c3ac2cf (AALMM)
3. Click Instance state then Start instance
4. Wait approx 1-2 mins for it to say Running. 
5. Copy the public IPv4 address and run it in browser e.g. http://3.106.246.208/

# If the page doesn't load
1. In EC2 security groups open student-allowed-sg-1
2. Inbound rules, the Edit inbound rules
3. Add rule: Type HTTP, Source type My IP
4. Save rules and refresh the page



