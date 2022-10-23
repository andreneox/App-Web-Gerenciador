## Setup Backend

```shell
python3 -m venv tutorial-env
tutorial-env\Scripts\activate.bat (Windows)
source tutorial-env/bin/activate  (Unix ou Mac)
cd ./backend
pip install -r requirements.txt
uvicorn main:app --reload
```
