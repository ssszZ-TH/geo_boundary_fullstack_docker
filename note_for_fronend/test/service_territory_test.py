# จาก file service ts ดังต่อไปนี้ ช่วยเขียน python test case ให้หน่อย เอาเเบบ print ออกมาสวยๆ 
# มีการทำ try catch error ในกรณีที่ request เเล้วล้มเหลว เอาเเบบ test ครบ create read readall update delete ทุก service

import requests

BASE_URL = "http://localhost:8080/api/v1"
HEADERS = {"Content-Type": "application/json"}

def print_test_result(operation, result, error=None):
    print("=" * 50)
    print(f"Test: {operation}")
    if error:
        print(f"Status: FAILED\nError: {error}")
    else:
        print(f"Status: PASSED\nResult: {result}")
    print("=" * 50)

def test_services():
    geo_code = "test-geo"
    name = "Test Name"
    abbreviation = "TST"
    type_id = 7

    # Test Create
    try:
        create_response = requests.post(
            f"{BASE_URL}/geographic_boundary",
            json={"geo_code": geo_code, "name": name, "abbreviation": abbreviation, "type_id": type_id},
            headers=HEADERS
        )
        create_response.raise_for_status()
        geo_id = create_response.json().get("geo_id")
        print_test_result("Create Geographic Boundary", create_response.json())
    except Exception as e:
        print_test_result("Create Geographic Boundary", None, str(e))
        return

    # Test Read All
    try:
        read_all_response = requests.get(f"{BASE_URL}/service_territory", headers=HEADERS)
        read_all_response.raise_for_status()
        print_test_result("Read All Service Territories", read_all_response.json())
    except Exception as e:
        print_test_result("Read All Service Territories", None, str(e))
    
    # Test Read by ID
    try:
        read_by_id_response = requests.get(f"{BASE_URL}/service_territory/{geo_id}", headers=HEADERS)
        read_by_id_response.raise_for_status()
        print_test_result("Read Service Territory by ID", read_by_id_response.json())
    except Exception as e:
        print_test_result("Read Service Territory by ID", None, str(e))
    
    # Test Update
    updated_geo_code = "updated-geo"
    updated_name = "Updated Name"
    try:
        update_response = requests.put(
            f"{BASE_URL}/geographic_boundary/{geo_id}",
            json={"geo_code": updated_geo_code, "name": updated_name, "abbreviation": abbreviation, "type_id": type_id},
            headers=HEADERS
        )
        update_response.raise_for_status()
        print_test_result("Update Geographic Boundary", update_response.json())
    except Exception as e:
        print_test_result("Update Geographic Boundary", None, str(e))
    
    # Test Delete
    try:
        delete_response = requests.delete(f"{BASE_URL}/geographic_boundary/{geo_id}", headers=HEADERS)
        delete_response.raise_for_status()
        print_test_result("Delete Geographic Boundary", delete_response.json())
    except Exception as e:
        print_test_result("Delete Geographic Boundary", None, str(e))

if __name__ == "__main__":
    test_services()
