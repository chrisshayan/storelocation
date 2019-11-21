import pytest
import os
from api.place import Place


@pytest.fixture()
def fixture_gmaps(monkeypatch):
    print('this is fixture')


@pytest.mark.usefixtures('fixture_gmaps')
class TestPlaceAPI:
    @classmethod
    def setup_class(cls):
        place = Place()

    @classmethod
    def teardown_class(cls):
        pass

    def setup_method(self, method):
        pass

    def teardown_method(self, method):
        pass

    def test_collect_places(self):

        print('should return empty list when conditions list is empty')

        print('should not call send_email function when conditions list is empty')

        print('should return empty list when email is empty')

        print('should call firebase to create the document for places collection')

        print('should call search places function for every condition')

        print('should sleep 2 seconds after a single search places')

        print('should call send_email function')
