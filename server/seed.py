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
        verified_status=True # enable for seeding multiple hospitals' requests
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
    print("Seeding blood requests across hospitals...")
    # Create several sample requests distributed between the two hospitals
    blood_types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    urgency_levels = ['Normal', 'Urgent', 'Critical']
    sample_requests = []
    for _ in range(12):
        hosp = random.choice([hospital1, hospital2])
        req = BloodRequest(
            patient_name=fake.name(),
            blood_type_needed=random.choice(blood_types),
            quantity=random.randint(1, 6),
            urgency_level=random.choice(urgency_levels),
            status=random.choice(['Pending', 'Pending', 'Pending', 'Fulfilled']),
            hospital_id=hosp.id
        )
        sample_requests.append(req)

    db.session.add_all(sample_requests)
    db.session.commit()

    print("Seeding donations...")
    #finds donors who are a match for the 'O-' request.
    matching_donors_o_neg = [d for d in donors if d.blood_type == 'O-']
    # create a completed donation for any fulfilled request (if present)
    fulfilled_req = next((r for r in sample_requests if r.status == 'Fulfilled'), None)
    if fulfilled_req:
        donation1 = Donation(
            donor_id=random.choice(donors).id,
            request_id=fulfilled_req.id,
            status='Completed'
        )
        db.session.add(donation1)

    # scheduled donation for a pending 'O-' request from a matching donor (if any)
    pending_o_req = next((r for r in sample_requests if r.status == 'Pending' and r.blood_type_needed == 'O-'), None)
    if matching_donors_o_neg and pending_o_req:
        donation2 = Donation(
            donor_id=random.choice(matching_donors_o_neg).id,
            request_id=pending_o_req.id,
            status='Scheduled'
        )
        db.session.add(donation2)

    db.session.commit()
    
    print("Database seeding completed successfully!")


if __name__ == '__main__':
    with app.app_context():
        run_seed()