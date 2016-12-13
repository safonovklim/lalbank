# LAL Bank

Framework: **Ruby on Rails**

## Installation
1) `git clone https://github.com/safonovklim/lalbank && cd lalbank`<br>
2) Configure PostgreSQL in `config/database.yml`<br>
3) Configure secrets (more info below)
4) `rake db:setup`<br>
5) `rails server`<br>

## API Objects
* **Employee**<br>
Parameters:<br>
**username** - string<br>
**password** - string<br>
**role** - string (enum: `not_activated`, `fired`, `support_agent`, `analyst`, `security_staff`, `founder`)<br>

* **Client**<br>
Parameters:<br>
**last_name** - string<br>
**first_name** - string<br>
**middle_name** - string<br>
**birth_at** - string<br>
**status** - string (enum: `not_approved`, `activated`, `banned`)<br>

* **Gateway Transaction**<br>
Parameters:<br>
**card_number** - string (16 digits)<br>
**expire_at** - date<br>
**pin_code** - string (4 digits)<br>
**amount** - decimal<br>
**currency** - string (3 chars)<br>
**category** - integer<br>
Example:<br>
`{
    "card_number":"3440957228547920",
    "expire_at":"2020-12-12",
    "pin_code":"3641",
    "amount":-100.42,
    "currency":"RUB",
    "category":24
}`

## API Methods

### For clients
before endpoint add: **/api/v1**
* [POST] **/clients/sign_up**<br>
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

* [GET] **/clients**<br>
No parameters

* [GET] **/clients/:id**<br>
No parameters

* [POST] **/clients/:id/approve**<br>
No parameters. For employee with role _security_staff_.
Will change Client `status` from **not_approved** to **activated**

* [POST] **/clients/:id/ban**<br>
No parameters. For employee with role _security_staff_.<br>
Will change Client `status` from **activated** to **banned**

* [POST] **/clients/:id/unban**<br>
No parameters. For employee with role _security_staff_.
Will change Client `status` from **banned** to **activated**

* [GET] **/clients/:id/cards**<br>
No parameters. For all employee.

* [POST] **/clients/:id/cards**<br>
For employee with role _security_staff_.<br>
If success, will return card_number, expire date and pin code. Send it to client and remove.<br>
Parameters:<br>
card[currency] - string (ex. **RUB**)<br>

### For payments
before endpoint add: **/gateway/v1**

* [POST] **/sexycard**<br>
For SexyCard payment systems<br>
Required header:<br>
**X-SexyCard-Signature** - string (is SHA1 of JSON input and signature key joined with |)<br>
Required parameters:<br>
transaction - Gateway Transaction<br>

## Security
`config/secrets.yml` file contain secret keys for all stages of project (development, test, production).<br>
Before running in production, please add to environment following keys.<br>
* **SECRET_KEY_BASE**
* **G_SEXYCARD**
<br>

You can generate it thru `rails secret`.