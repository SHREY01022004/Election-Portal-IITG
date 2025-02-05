import webview

webview.create_window('Election Portal Admin', 'https://swc.iitg.ac.in/voting_portal/admin', fullscreen=True, frameless=True, on_top=True)

webview.start(user_agent='Chrome Windows [Election-24] 1337')