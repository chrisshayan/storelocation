import pytest
import os
from api.place import Place
from api.email import Email


@pytest.fixture()
def fixture_gmaps(monkeypatch):
    print('this is fixture')


def monkey_send_email(template: str = '', data: dict = {}):
    print('called monkey_send_email()')
    return True


@pytest.mark.usefixtures('fixture_gmaps')
class TestPlaceAPI:
    @classmethod
    def setup_class(cls):
        self.place = Place()
        self.email = Email()
        self.email.send = monkey_send_email

    @classmethod
    def teardown_class(cls):
        pass

    def setup_method(self, method):
        pass

    def teardown_method(self, method):
        pass

    def test_collect_places(self):
        default_email = 'email@example.com'
        default_conditions = [{
            id: 'ChIJtSv6BAEvdTERG8q39xvBCLI',
            name: 'PRECITA NGUYỄN TRÃI',
            radius: 50
        }]
        email = ''
        conditions = []

        email = default_email
        conditions = []
        print('should return empty list when conditions list is empty')
        assert len(self.place.collect_places(conditions, email)) == 0

        email = ''
        conditions = default_conditions
        print('should return empty list when email is empty')
        assert len(self.place.collect_places(conditions, email)) == 0

        # print('should call firebase to create the document for places collection')

        # print('should call search places function for every condition')

        # print('should sleep 2 seconds after a single search places')

        # print('should call send_email function')
