import json
import threading
g_lock=threading.Lock()
data = [["编号","负责人","崩溃次数","来源","栈信息","修复说明"]]

with open('./test', 'w') as f:
    f.write(json.dumps(data))

#f = open('./test', 'wt')
#f.write(json.dumps(data))
#f.close()
class sup_thread(threading.Thread):
    def __init__(self, rfile, length):
        threading.Thread.__init__(self)
        self.length = length
        self.rfile = rfile
        self.start()
        pass
    def run(self):
        g_lock.acquire()
        try:
            post_data = self.rfile.read(self.length).decode('utf-8')
            print("---------------->"+post_data)
            self.rfile.close()
            post_data = json.loads(post_data)
            with open('./test', 'r+') as f:
                original_data = (f.read())            
                original_list = json.loads(original_data)
                if 5==len(post_data):
                    original_list.append(post_data)
           
                elif 6==len(post_data):
                    if int(post_data[0])<len(original_list):
                        original_list[int(post_data[0])].append(post_data[-1])

                f.seek(0)
                f.truncate()
                f.write(json.dumps(original_list))
        finally:
            g_lock.release()               
                    

        #self.ret = (json.dumps(data)).encode('utf-8')
        #self.wfile.write(self.ret)
        #self.wfile.close()
        #self.rfile.close()
def supProcess():
    self.ret = json.dumps(data)
