from app import app, db
from app.models import Link

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Link': Link}
