import mServer
import socketserver
import http.server
PORT = 8000

Handler = mServer.CGIHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
