from app import app, db
from flask import render_template, redirect, url_for, jsonify
from werkzeug import exceptions
from app.models import Link
from app.forms import LinkForm
from app.utils.parse_url import parse_url
import qrcode
import os


# store recent link in global var
x = []



@app.route('/', methods=['GET', 'POST'])
def index():
    form = LinkForm()
    if form.validate_on_submit():
        link = Link(link_url=parse_url(form.url.data))
        link.set_hash(parse_url(form.url.data))
        img = qrcode.make(link.link_url)
        path = './app/static/images'
        # os.mkdir(path)
        img.save(f'{path}/qrcode-{link.short}.png')
        

        existing = Link.query.filter_by(short=link.short).first()
        if not existing:
            db.session.add(link)
            db.session.commit()
        global x
        x = [link.short, parse_url(link.link_url)]
        return redirect(url_for('index'))
        
    # grab recent and reset global var
    temp = x
    x = []
    return render_template('home.html', form=form, result=temp)
        

@app.route('/<string:hash>')
def short(hash):
    link = Link.query.filter_by(short=hash).first_or_404()
    url = parse_url(link.link_url)
    return redirect(url)

@app.errorhandler(exceptions.NotFound)
def error_404(err):
    return redirect('/')

@app.errorhandler(exceptions.BadRequest)
def handle_400(err):
    return redirect('/')

@app.errorhandler(exceptions.InternalServerError)
def handle_500(err):
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)
