import json
from django.contrib.auth.models import User
from django.db import IntegrityError
from main.models import EUser
# from models import EUser

def func():
    
    # new_file_final was 2023 election college database 
    # f = open('main/static/new_file_final.json')
    # data = json.load(f)
    # dict_data = {}
    # for key,values in data['IITG_Email_Updated'].items():
    #     print(values)
    #     user = User(username=values, email=values + "@iitg.ac.in")
    #     try:
    #         user.save()
    #         print("User saved successfully!")
    #     except IntegrityError as e:
    #         print(f"Failed to save user: {e}")
            
    # using oneStop database
# Assuming this code block is within a function or method
    with open('main/data.json') as f:
        data = json.load(f)

        for values in data:
            outlook_email = values.get('email_id')  # Using get() to safely retrieve the value

            if outlook_email:
                # Check if user already exists
                if not User.objects.filter(username=outlook_email).exists():
                    # User does not exist, create a new one
                    user = User(username=outlook_email, email=outlook_email + "@iitg.ac.in")
                    try:
                        user.save()
                        print(f"User saved successfully! {outlook_email}")
                    except IntegrityError as e:
                        print(f"Failed to save user: {e}")
                else:
                    print(f"User {outlook_email} already exists, skipping creation.")
            else:
                print("Error: Missing or invalid 'iitg_webmail' in data.")
                
                
def func2():
    
    with open('main/static/data.json') as f:
        data = json.load(f)

        for values in data:
            outlook_email = values.get('email_id')  # Using get() to safely retrieve the value

            if outlook_email:
                # Check if user already exists
                user_to_update = EUser.objects.filter(email=outlook_email + "@iitg.ac.in").first()
                if user_to_update:
                    # User does not exist, create a new one
                    user_to_update.is_eligibleVoter = True
                    try:
                        user_to_update.save()
                        print(f"User saved successfully! {outlook_email}")
                    except IntegrityError as e:
                        print(f"Failed to save user: {e}")
                else:
                    print(f"User {outlook_email} already exists, skipping update.")
            else:
                print("Error: Missing or invalid 'iitg_webmail' in data.")
                
def func3():
    
    with open('main/data.json') as f:
        data = json.load(f)

        for values in data:
            outlook_email = values.get('email_id')  # Using get() to safely retrieve the value
            sname = values.get('roll_no')
            if outlook_email:
                # Check if user already exists
                user_to_update = EUser.objects.filter(email=outlook_email + "@iitg.ac.in").first()
                if user_to_update:
                    # User does not exist, create a new one
                    user_to_update.roll_number = sname
                    try:
                        user_to_update.save()
                        print(f"User saved successfully! {outlook_email}")
                    except IntegrityError as e:
                        print(f"Failed to save user: {e}")
                else:
                    print(f"User {outlook_email} already exists, skipping update.")
            else:
                print("Error: Missing or invalid 'iitg_webmail' in data.")

# for key,value in data['Roll No'].items():
#    dict_data[key] = {"roll_number":value}
# 	# print(key,value)

# for key,value in data['Name'].items():
#    dict_data[key]['name'] = value

# for key,value in data['IITG_Email_Updated'].items():
#    dict_data[key]["email"] = value + "@iitg.ac.in"
   

# for key,value in data['Gender'].items():
#    dict_data[key]["gender"] = value


# for key,value in dict_data.items():
   

# print(dict_data.keys())

# print(dir(dict_data))

# Closing file
# f.close()
