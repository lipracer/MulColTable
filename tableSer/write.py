import sys
import json

f = open("123.txt", "wt")
stdout = f
f.write(sys.argv[1])
'''
for i in jsonloads(sys.argv[1]):
    print(i)
'''
f.close()
