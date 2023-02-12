# SASAKAZI

# PROJECT DEVELOPMENT SETUP

1. cd into sasakazi.
        `cd client`
2. cd into payment, account, customer.
        `npm install`
3. then spin your client server.
        `npm run start`
4. configure you .env as show in .env.


## Payments Routes
1. /pay/send_stk_push - initializa stk push
2. /pay/callbackurl - mpesa callback

## customers routes
1. /customer/ - create user,
2. /customer/user - gets specific user

## account routes
1. /account/ - create new account
2. /account/all - gets account by users phonenumber