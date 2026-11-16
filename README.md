# Leave Management System 

This is IFQ636 Assign1, built on Task Manager starter. Allows employees the ability to request, view and cancel leave requets. Managers can then go and approve and reject with a reason needed. THe live URL is at http://13.211.110.121

# How it Works
1. Pick employee or manager when you register
2. Comprised of React frontend, Node/Express backend, MongoDB Atlas, JWT login
3. Approve/reject option is for managers only. THis was added in after a self review. 
4. nginx on port port 80 sends /api to backend (5001), everything else is sent to the frontend (3000), both run with pm2. 

# Running Locally 
1. Clone the repo
2. Make backend/.env from .env.example (MONGO_URI, JWT_SECRET, PORT)
3. NPM run install-all, then just npm run dev. 
4. Open localhost:3000

# Deploying
1. Ubuntu t2.micro, SYdney, student security groups, IFQ636-EC2-Role
2. SSH and HTTP rules for my IPa, server Ip added in Atlas
3. Installed, node, npm, nginx, pm2
4. Cloned repo, made .env, started backend and frontend with pm2. 
5. Nginx config, then restart


# limitations 
1. HTTP only allowed from my IP (QUT actually removes open rules)
2. No Leaave balances, as this was descoped 
3. No overlapping check, and no emails. 
4. HTTP and not HTTPS
5. IP changes is the instance is stopped. 


git clone https://github.com/AlexA-QUT/leave-management-system.git
npm run install-all
npm run dev