# 01.API


## Register
### request
- user_email
- user_name
- user_password
### response
- user_id

## Login
### request
- user_email
- user_password
### response
- login_token

## Reset Password
### request
- user_password
- old_user_password
### response
- reset_token

## Delete Password
### request
- user_email
- user_password
### response
- delete_token

## Search a user/Add a Friend
### request
- user_id
### response
- friend_token

## Get Friends List
### request
- friendslist_request
### response
- user_name