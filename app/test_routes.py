import json

def test_index(api):
    res = api.get('/')
    assert res.status == '200 OK'
    assert b'URL Shortener' in res.data
    # assert b'<input id="url" name="url" required="" type="text" value="">' in res.data

