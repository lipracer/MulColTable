import sys
import mServer
import socketserver
import http.server
PORT = 8000

flog = open('./test.log', 'w', buffering=1024)
sys.stdout = flog
sys.stderr = flog

Handler = mServer.CGIHTTPRequestHandler

with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
