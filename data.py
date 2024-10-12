import random
import requests
from datetime import datetime, timedelta

API_BASE_URL = "http://localhost:3001/api"  

def generate_property():
    total_units = random.randint(10, 100)
    filled_units = random.randint(0, total_units)
    vacant_units = total_units - filled_units
    occupancy_rate = (filled_units / total_units) * 100

    return {
        "ownerName": f"Owner {random.randint(1, 50)}",
        "propertyName": f"Property {random.randint(1, 100)}",
        "totalUnits": total_units,
        "filledUnits": filled_units,
        "vacantUnits": vacant_units,
        "occupancyRate": round(occupancy_rate, 2),
        "lastMaintenanceDate": (datetime.now() - timedelta(days=random.randint(0, 365))).strftime("%Y-%m-%d")
    }

def generate_financial_record(property_id):
    income = random.uniform(5000, 50000)
    expenses = random.uniform(1000, income)
    net_profit = income - expenses

    return {
        "propertyId": property_id,
        "income": round(income, 2),
        "expenses": round(expenses, 2),
        "netProfit": round(net_profit, 2)
    }

def submit_property():
    property_data = generate_property()
    response = requests.post(f"{API_BASE_URL}/properties", json=property_data)
    if response.status_code == 201:
        print("Property submitted successfully")
        return response.json()
    else:
        print(f"Failed to submit property: {response.text}")
        return None

def submit_financial_record(property_id):
    financial_data = generate_financial_record(property_id)
    response = requests.post(f"{API_BASE_URL}/financials", json=financial_data)
    if response.status_code == 201:
        print("Financial record submitted successfully")
        return response.json()
    else:
        print(f"Failed to submit financial record: {response.text}")
        return None

def fetch_properties():
    response = requests.get(f"{API_BASE_URL}/properties")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch properties: {response.text}")
        return []

def fetch_financials():
    response = requests.get(f"{API_BASE_URL}/financials")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch financials: {response.text}")
        return []

def main():
    
    for _ in range(5):  
        property = submit_property()
        if property:
            for _ in range(3):  
                submit_financial_record(property['id'])

    
    print("\nAll Properties:")
    properties = fetch_properties()
    for prop in properties:
        print(f"ID: {prop['id']}, Name: {prop['propertyName']}, Owner: {prop['ownerName']}, Occupancy Rate: {prop['occupancyRate']}%")

    
    print("\nAll Financial Records:")
    financials = fetch_financials()
    for record in financials:
        print(f"ID: {record['id']}, Property ID: {record['propertyId']}, Income: ${record['income']}, Expenses: ${record['expenses']}, Net Profit: ${record['netProfit']}")

if __name__ == "__main__":
    main()