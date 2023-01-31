from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class LinkForm(FlaskForm):
    url = StringField('Link', validators=[DataRequired()])
    submit = SubmitField('Shorten URL')
