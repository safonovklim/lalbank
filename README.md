# LAL Bank

Framework: **Ruby on Rails**

## API Objects
* **transaction**<br>
Example:<br>
{<br>
    "card_number":"3440957228547920",<br>
    "expire_at":"2020-12-12",<br>
    "pin_code":"3641",<br>
    "amount":-100.42,<br>
    "currency":"RUB",<br>
    "category":24<br>
}

## API Methods

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

**Authorized requests**<br>
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
For employee with role _security_staff_.<br>
If success, will return card_number, expire date and pin code. Send it to client and remove.<br>
Parameters:<br>
card[currency] - string (ex. **RUB**)<br>

### For payments
before endpoint add: **/gateway/v1**

* [POST] **/sexycard**<br>
For SexyCard payment systems<br>
Required header:<br>
**X-SexyCard-Signature** - string (is SHA1 of JSON input and key joined with |)<br>
Required parameters:<br>
employee - transaction<br>