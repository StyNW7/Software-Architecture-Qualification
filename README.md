# Software Architecture

### Design Pattern

You can follow this to run the code (in the root folder):

Case 1: 

<code>npx ts-node "./Design-Pattern/Case-1-Creational-Pattern/Builder-Pattern.ts"</code>

Case 2:

<code>npx ts-node "./Design-Pattern/Case-2-Structural-Pattern/Adapter-Pattern.ts"</code>

Case 3:

<code>npx ts-node "./Design-Pattern/Case-3-Behavioural-Pattern/Observer-Pattern.ts"</code>


#### Design Pattern: Convert to JavaScript first (If want to)

npx tsc "./Design-Pattern/Case-1-Creational-Pattern/Builder-Pattern.ts"

node "./Design-Pattern/Case-1-Creational-Pattern/Builder-Pattern.js"


### Microservices App

npx prisma migrate dev --name init_post_db

http://localhost:3001/api

npx prisma studio