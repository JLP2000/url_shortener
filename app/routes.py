from app import app, db
from flask import render_template, redirect, url_for, jsonify
from werkzeug import exceptions
from app.models import Link
from app.forms import LinkForm
import re

x = []

@app.route('/', methods=['GET', 'POST'])
def index():
    form = LinkForm()
    if form.validate_on_submit():
        link = Link(link_url=form.url.data)
        link.set_hash(form.url.data)
        print(f"short: {link.short}")
        existing = Link.query.filter_by(short=link.short).first()
        print(f"existing: {existing}")
        if not existing:
            db.session.add(link)
            db.session.commit()
        global x
        x = [link.short, link.link_url]
        return redirect(url_for('index'))

    return render_template('home.html', form=form, result=x)

@app.route('/<string:hash>')
def short(hash):
    link = Link.query.filter_by(short=hash).first_or_404()
    x = re.search("^http*$", link.link_url)
    if x:
        return redirect(link.link_url)
    else:
        return redirect(f'https://{link.link_url}')

@app.errorhandler(exceptions.NotFound)
def error_404(err):
    return jsonify({"message": f"Oops.. {err}"}), 404

@app.errorhandler(exceptions.BadRequest)
def handle_400(err):
    return {'message': f'Oops! {err}'}, 400

@app.errorhandler(exceptions.InternalServerError)
def handle_500(err):
    return {'message': f"It's not you, it's us...{err}"}, 500

if __name__ == "__main__":
    app.run(debug=True)
