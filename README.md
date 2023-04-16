NB On Windows, npm scripts are executed in cmd.exe as the default shell which does not support bash commands. For the above bash commands to work, you can change the default shell to Bash (in the default Git for Windows installation) as follows:

'''
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
'''