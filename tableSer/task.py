import threading
import queue
import pickle
class Task:
    def __init__(self, func, *argv):
        self.func = func
        self.argv = argv
    def __call__(self):
        try:
            self.func(*(self.argv))
        except TypeError as e:
            print(e)

def update_sql(table):
    try:
        with open("pickle.db", "wb+") as f:
            pickle.dump(table, f)
    except FileNotFoundError as e:
        print(e)
    except pickle.PickleError as e:
        print(e)
def load_table():
    try:
        with open("pickle.db", "rb+") as f:
            return pickle.load(f)
    except FileNotFoundError as e:
        print(e)
        return None
    except pickle.PickleError as e:
        print(e)
        return None
class Consume(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        self._queue = queue.Queue(0)
        self.start()
    def run(self):
        while True:
            task = self._queue.get()            
            task()
            if None == task:
                print("break")
                break

    def put(self, task):
        self._queue.put(task)
    def get(self):
        print(self._queue.get())
consume = Consume()
