import json
import threading
g_lock=threading.Lock()
data = [{
            "name":"yexiaochai",
            "index": 0,
            "data":['xx', 'xx', 'xx', 'xx']
            },
         {
            "name":"luanshikuangdao",
            "index": 1,
            "data":['xx', 'xx', 'xx', 'xx']
            },
        {
            "name":"jianjun",
            "index": 2,
            "data":['xx', 'xx', 'xx', 'xx']
            },
        {
            "name":"yiyeshu",
            "index": 3,
            "data":['xx', 'xx', 'xx', 'xx']
            },
        {
            "name":"suhuanzhen",
            "index": 4,
            "data":['xx', 'xx', 'xx', 'xx']
            },
        {
            "name":"quemeiren",
            "index": 5,
            "data":['xx', 'xx', 'xx', 'xx']
            },
        {
            "name":"junhuang",
            "index": 6,
            "data":['xx', 'xx', 'xx', 'xx']
            },
        {
            "name":"shezhiduo",
            "index": 7,
            "data":['xx', 'xx', 'xx', 'xx']
            },
        {
            "name":"fengcailing",
            "index": 8,
            "data":['xx', 'xx', 'xx', 'xx']
            },
         ]

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
            self.rfile.close()
            dict_data = json.loads(post_data)
            with open('./test', 'r+') as f:
                original_data = (f.read())            
                original_list = json.loads(original_data)
                for i,item in enumerate(original_list):
                    if (str(item['index']) == dict_data['index']):
                        if len(original_list[i]['data'])==4:
                            original_list[i]['data'].append(dict_data['data'])
                        else:
                            original_list[i]['data'][4] = dict_data['data']
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
