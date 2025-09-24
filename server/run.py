
from app import create_app, db

from app.models.user import User
from app.models.hospital import Hospital
from app.models.blood_request import BloodRequest
from app.models.donation import Donation


app = create_app()


if __name__ == '__main__':
   
    app.run(host='0.0.0.0', port=5000, debug=True)