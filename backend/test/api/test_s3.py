import pytest
from api.s3 import AwsS3


class TestS3API:
    @classmethod
    def setup_class(cls):
        cls.s3 = AwsS3()

    def test_generate_url(self):
        print('should generate s3_url from filename')
        file_name = '2019-11-13 17:19:12.105229.json'
        assert self.s3.generate_url(
            file_name) == 'https://mekong-temp.s3-ap-southeast-1.amazonaws.com/2019-11-13+17%3A19%3A12.105229.json'
