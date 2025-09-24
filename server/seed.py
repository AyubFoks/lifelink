import random
from faker import Faker

from app import create_app, db
from app.models.user import User
from app.models.hospital import Hospital
from app.models.blood_request import BloodRequest
from app.models.donation import Donation

fake = Faker()

app = create_app()

def run_seed():
    """Seeds the database with sample data."""
    print("Starting database seed...")

    #deletes in reverse order of creation to avoid foreign key constraint errors.
    print("Deleting existing data...")
    Donation.query.delete()
    BloodRequest.query.delete()
    User.query.delete()
    Hospital.query.delete()
    db.session.commit()

    print("Seeding hospitals...")
    hospital1 = Hospital(
        name='Nairobi Hospital',
        address='Argwings Kodhek Rd, Nairobi',
        contact_info='0730 666 000',
        verified_status=True #this hospital can create requests.
    )
    hospital2 = Hospital(
        name='The Aga Khan University Hospital',
        address='3rd Parklands Ave, Nairobi',
        contact_info='020 366 2000',
        verified_status=False #this one cannot create requests yet.
    )
    db.session.add_all([hospital1, hospital2])
    db.session.commit()

    print("Seeding users...")
    
    #creates a Platform Admin for managing the app.
    platform_admin = User(
        email='superadmin@lifelink.org',
        full_name='Platform Admin',
        role='platform_admin'
    )
    platform_admin.password = 'Admin123!'
    
    #create Hospital Admins and link them to the hospitals.
    hospital1_admin = User(
        email='admin@nairobihospital.org',
        full_name='Dr. Jane Doe',
        role='hospital_admin',
        hospital_id=hospital1.id 
    )
    hospital1_admin.password = 'Admin456!'

    hospital2_admin = User(
        email='admin@agakhan.org',
        full_name='Dr. John Smith',
        role='hospital_admin',
        hospital_id=hospital2.id 
    )
    hospital2_admin.password = 'Admin789!'
    
    db.session.add_all([platform_admin, hospital1_admin, hospital2_admin])
    
    #list of Donors.
    donors = []
    blood_types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    locations = ['Westlands', 'Kilimani', 'Lavington', 'Karen', 'Runda', 'South C', 'Parklands']
    for _ in range(20):
        donor = User(
            email=fake.unique.email(),
            full_name=fake.name(),
            role='donor', 
            blood_type=random.choice(blood_types),
            location=f"{random.choice(locations)}, Nairobi",
            availability=True
        )
        donor.password = 'Donor000!'
        donors.append(donor)
    
    db.session.add_all(donors)
    db.session.commit()

    
    #create requests only from the VERIFIED hospital.
    print("Seeding blood requests...")
    request1 = BloodRequest(
        patient_name=fake.name(),
        blood_type_needed='O-',
        quantity=2,
        urgency_level='Critical',
        status='Pending', 
        hospital_id=hospital1.id
    )
    request2 = BloodRequest(
        patient_name=fake.name(),
        blood_type_needed='A+',
        quantity=4,
        urgency_level='Urgent',
        status='Pending',
        hospital_id=hospital1.id
    )
    request3 = BloodRequest(
        patient_name=fake.name(),
        blood_type_needed='B+',
        quantity=1,
        urgency_level='Normal',
        status='Fulfilled', 
        hospital_id=hospital1.id
    )
    db.session.add_all([request1, request2, request3])
    db.session.commit()

    print("Seeding donations...")
    #finds donors who are a match for the 'O-' request.
    matching_donors_o_neg = [d for d in donors if d.blood_type == 'O-']
    
    #creates a completed donation for the fulfilled request.
    donation1 = Donation(
        donor_id=random.choice(donors).id,
        request_id=request3.id,
        status='Completed'
    )
    
    #scheduled donation for the pending 'O-' request from a matching donor.
    if matching_donors_o_neg:
        donation2 = Donation(
            donor_id=random.choice(matching_donors_o_neg).id,
            request_id=request1.id,
            status='Scheduled'
        )
        db.session.add(donation2)

    db.session.add(donation1)
    db.session.commit()
    
    print("Database seeding completed successfully!")


if __name__ == '__main__':
    with app.app_context():
        run_seed()