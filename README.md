# LAL Bank

Framework: **Ruby on Rails**

## API

### For clients
before endpoint add: **/api/v1**
* [POST] **/users/sign_up**<br>
Parameters:<br>
client[last_name] - string<br>
client[first_name] - string<br>
client[middle_name] - string<br>
client[birth_at] - date (ex. *1999-12-31*)<br>

### For employee
before endpoint add: **/api/v1**

* [POST] **/employee/sign_up**<br>
Parameters:<br>
employee[username] - string<br>
employee[password] - string<br>

* [POST] **/employee/log_in**<br>
If success, will return token. Use it for request.<br>
Parameters:<br>
username - string<br>
password - string<br>

Authorized requests<br>
Send header: Authorization: Token token=**YOUR_TOKEN**

* [GET] **/users**<br>
No parameters

* [GET] **/users/:id**<br>
No parameters

* [POST] **/users/:id/approve**<br>
No parameters. For employee with role _security_staff_.

* [POST] **/users/:id/ban**<br>
No parameters. For employee with role _security_staff_.

* [POST] **/users/:id/unban**<br>
No parameters. For employee with role _security_staff_.

* [GET] **/users/:id/cards**<br>
No parameters. For all employee.

* [POST] **/users/:id/cards**<br>
For employee with role _security_staff_.
Parameters:<br>
card[currency] - string (ex. **RUB**)<br>