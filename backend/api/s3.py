import boto3
import json
import os
import datetime
import urllib.parse


class AwsS3:
    """ AWS Class for working with AWS S3
    """

    def __init__(self):
        self.s3_bucket = 'mekong-temp'
        self.s3_region = 'ap-southeast-1'
        s3_mapper_key = os.environ.get(
            's3_mapper_key', 'AWS S3 API Key is not set!')
        if(s3_mapper_key):
            s3_key = json.loads(s3_mapper_key)
            ACCESS_KEY = s3_key.get('access')
            SECRET_KEY = s3_key.get('secret')
            self.S3 = boto3.client(
                's3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)

    def upload(self, file_name: str, data: dict):
        """ Load Data into S3
        """
        try:
            Key = f"{file_name}.json"
            self.S3.put_object(
                ACL='public-read',
                Body=json.dumps(data, default=self.datetime_to_str),
                Bucket=self.s3_bucket,
                Key=Key
            )

            return self.generate_url(Key)
        except Exception:
            raise

    def generate_url(self, file_name: str):
        url = f"https://{self.s3_bucket}.s3-{self.s3_region}.amazonaws.com/{urllib.parse.quote(file_name)}"
        return url

    def datetime_to_str(self, o):
        if isinstance(o, datetime.datetime):
            return o.__str__()
