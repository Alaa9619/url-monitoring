# Uptime monitoring RESTful API server

Allows authenticated users to monitor URLs, and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

## Requirements
1. Sign-up with email verification
2. CRUD operations for URL checks (GET, PUT and DELETE can be called only by the user use who created the check).
3. Authenticated users can receive a notification whenever one of their URLs goes down or up using email
4. Authenticated users can get detailed uptime reports about their URLs availability, average response time, and total uptime/downtime.
5. Authenticated users can group their checks by tags and get reports by tag.
