from mongoengine import *
from ..config import get_db_config

config = get_db_config()
collection = 'places'
connect(alias=collection, username=config['username'], password=config['password'],
        host=config['connection_string'])


class Places(Document):
    name = StringField()
#     place_id = StringField()

    meta = {'db_alias': collection}
