
 # Election Portal Start:
 
    - To add users to User model run the script from the file 'backend/main/script_for_data.py' named 'func'. This adds users to User model and fires a signal to simultaneously add  Euser associated with the user.
    - Removed OnlyOrganizerUpdate permissions from CandidatesViewSet Class inside 'backend/main/views.py'
    - Deadlines are not hardcoded. They are being used from db.

# Voting Portal Start:
    - A Eligible Voters List will be provided which will be first converted to json data and then used inside a script present in 'backend/main/script_for_data.py' named 'func2'. This will change the value of is_eligibleVoter in the Euser model.
    - Roll Number is being used to fetch user details.


# Voting Portal Flow:
    # Voting Booths Setup:
      - A user agent or file 'main_voting.exe' is installed in all of the polling booths on which voting takes place.
      - There is a restriction of Browser as well as IP which doesn't anyone to cast vote from anywhere other than polling booths.
      - dont use main_voting.exe next time as this time it created a lo of issue because the full screen window opened through this app can be moved and due to this in the frontend side the seal and submit buttton a lot of times becomes not visible. so volunteers had to again and again restart the the exe file so that it could be full screen
      - There is a crome setting of https://support.google.com/chrome/a/answer/3316168?hl=en or Kisok mode in chrome explore this if this is feasible.
      - You guys can also use chrome portable in this folder there are two files help and text file which contains config settings check them to know more and decide which is better to use kisok mode or chrome portable. I think chrome portable might be better. 
      - Vote casting can also be done without internet Agnigarh is not required to cast vote. 
      - I also have added sol.py file which was used this year i.e 2024 for creating portable browser dont use that. - creates a lot of problem
    # Voters Registrations:
      - Students first register themselves as voters on onestop.
      - Only those whose emails are in Euser db are allowed to register themselves.
    # swc.iitg.ac.in/voting_portal/admin:
      - Voters comes and generate OTP using voting admin portal.
      - If the value of is_eligibleVoter is false, the person cannot make a vote.
    # swc.iitg.ac.in/voting_portal/otp:
      - Once the voters receive their OTP over mail they fill it over the voting otp portal to generate their voter id.
    # swc.iitg.ac.in/voting_portal:
      - Voters type their voter id here and voting starts. 
      - Once the Voting ends, the value of is_voted inside Voters schema is marked to true and voters cannot make another vote. 
    # Some changes for Voting:
      - Added is_eligibleVoter boolean to Euser model and updated the view function 'voter_card' inside 'backend/main/views.py'
      - Removed some branch codes from the others category inside handle_stats view function in 'backend/main/views.py'

# Voting Portal Result View:
    # swc.iitg.ac.in/elections_api/sgc/result_view
      -  We are using 2048 RSA encryption.
      -  Keys to be updated in the frontend in a variable notBlockChainKey which is in index.js file in frontend
    # Public/Private key generation:
      - Before the elections starts, Dean generates public as well as private keys. Then he gives the public key to swc team and keeps the private key with him. He then tests the private key if the votes are being generated or not. Once verified, the election begins.
    # Result Day:
      - On the day of elections, Dean provides the private key in a meet with election as well as swc team and the results are generated.
      
# Things to Remember:
    # Running Migrations for model changes:
      - To run Migrations, go inside the container using exec command and then inside python shell using 'python manage.py shell'. Then run makemigrations and migrate.
      - These changes can't be done locally as the migrations folder is inside the gitignore file.
    # Copying keys for encryption/decryption:
      - Be careful while copying private/public keys from whatsapp as their might be a special character copied as well which may fail the process.
    # Incomplete Data by Election Team:
      - Many times the list provided by Election Team be it Users data or Eligible Voters Data, there might be a possibility of missing data. Then SWC team manually adds/updates data such as manually allowing Eusers to be eligible for voting.
    #scripts/migrate_and_run file
      - In scripts/migrate_and_run file dosnt has actual migrate command it contains command to start and run django project.
      - To increase resources given to this docker container during elections increase worker count in migrate_and_run file. 
      - Also make sure that timeout in this gunicorn script is more than 15 minutes. here timeout refers to the timeout of a worker. this became a major issue when vote counting was taking place when the timeout was only of 3 minutes and the vote counting function took more than 3 minutes to decrypt and calculate all the votes of college this was automatically breaking the conection with the database and the vote counting was stopping every time in between this created a lot of issue. 
    # IP Blocking 
      - Make sure ip blocking is done for voting portal in nginx and voting portal can only be opened thorugh ngnix. 
    # Incomplete Eligible voters list
      - To show statistics total students, total boys and girls needs to be updated. this is hardcoded in the frontend. you can find this in academic sso using swc account ask this to gs and oc they would know about this
      - Eligible voters list that comes from college is always incomplete and some students are always missing.
      - this time total college students were around 8400 and list of eligible were 7700 so around 700 missing data even if 50% voter turnout is assumed 350 missing students data that needs to be added through the admin during voting day but actually this does not happens only 50-60 students were actually added. 
      - use onestop data to create eusers in func() this will make sure that those students whose names are not there in the list by election commison there users and eusers are created just eligible voting is false. 
      - In onestop code updating name is not allowed and if the name is not there in euser model the user will not be able to create there votercard on onestop as before submiting on onestop name is not allowed to be empty add names of users using onestop data using func3()
      - Roll number update is stopped through backend as if user adds wrong roll number wrong photo is fetched from the academic sso. update roll number also using func3() update the code for roll and name. depending upon use case.
      - to run this funcs go inside backend docker container go type "python manage.py shell" this will open python terminal type "from main.script_for_data import *" to imports funcs and then type "func3()" to run the func. 
      - command to go inside docker container and install nano in docker containr
      docker exec -it 437ca01ce49f /bin/bash
      apt-get update && apt-get install -y nano