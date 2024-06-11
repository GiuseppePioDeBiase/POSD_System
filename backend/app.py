from flask import jsonify
from datetime import datetime
import platform
import socket
from backend.config.config import create_app
from backend.routes import routes

app = create_app()


@app.route('/')
def start():
    now = datetime.now()
    time = now.strftime("%A %Y-%m-%d - %H:%M:%S")
    hostname = socket.gethostname()
    ip = socket.gethostbyname(hostname)
    system = platform.system()
    response = {
        "message": "Start session",
        "current_time": time,
        "system_info": {
            "python_version": platform.python_version(),
            "system": system,
            "node": platform.node(),
            "release": platform.release(),
            "version": platform.version(),
            "machine": platform.machine(),
            "processor": platform.processor(),
            "local_ip": ip
        }
    }
    return jsonify(response)


app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=False)
