from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, URLField
from wtforms.validators import DataRequired, ValidationError, Regexp

class LinkForm(FlaskForm):
    url = StringField('Link', validators=[DataRequired(), Regexp('.+\..+', 0, 'URL must be a valid link')])
    submit = SubmitField('Shorten URL')
