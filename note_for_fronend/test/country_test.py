import aiohttp
import asyncio
import json

BASE_URL = "http://localhost:8080/api/v1"

async def print_test_result(operation, result=None, error=None):
    print("=" * 50)
    print(f"Test: {operation}")
    if error:
        print(f"Status: FAILED\nError: {error}")
    else:
        print(f"Status: PASSED\nResult: {result}")
    print("=" * 50)

async def test_services():
    geo_code = "test-geo"
    name = "Test Name"
    abbreviation = "TST"
    type_id = 1
    geo_id = None

    async with aiohttp.ClientSession() as session:
        # Test Create
        try:
            async with session.post(
                f"{BASE_URL}/geographic_boundary",
                json={"geo_code": geo_code, "name": name, "abbreviation": abbreviation, "type_id": type_id}
            ) as create_response:
                create_data = await create_response.json()
                create_response.raise_for_status()
                geo_id = create_data.get("geo_id")
                await print_test_result("Create Geographic Boundary", create_data)
        except Exception as e:
            await print_test_result("Create Geographic Boundary", error=str(e))
            return
        
        # Delay 2 seconds before proceeding to the next test
        await asyncio.sleep(5)

        # Test Read All
        try:
            async with session.get(f"{BASE_URL}/country") as read_all_response:
                read_all_data = await read_all_response.json()
                read_all_response.raise_for_status()
                await print_test_result("Read All Countries", read_all_data)
        except Exception as e:
            await print_test_result("Read All Countries", error=str(e))

        # Delay 2 seconds
        await asyncio.sleep(5)

        # Test Read by ID
        try:
            async with session.get(f"{BASE_URL}/country/{geo_id}") as read_by_id_response:
                read_by_id_data = await read_by_id_response.json()
                read_by_id_response.raise_for_status()
                await print_test_result("Read Country by ID", read_by_id_data)
        except Exception as e:
            await print_test_result("Read Country by ID", error=str(e))

        # Delay 2 seconds
        await asyncio.sleep(5)

        # Test Update
        updated_geo_code = "updated-geo"
        updated_name = "Updated Name"
        try:
            async with session.put(
                f"{BASE_URL}/geographic_boundary/{geo_id}",
                json={"geo_code": updated_geo_code, "name": updated_name, "abbreviation": abbreviation, "type_id": type_id}
            ) as update_response:
                update_data = await update_response.json()
                update_response.raise_for_status()
                await print_test_result("Update Geographic Boundary", update_data)
        except Exception as e:
            await print_test_result("Update Geographic Boundary", error=str(e))

        # Delay 2 seconds
        await asyncio.sleep(5)

        # Test Delete
        try:
            async with session.delete(f"{BASE_URL}/geographic_boundary/{geo_id}") as delete_response:
                delete_data = await delete_response.json()
                delete_response.raise_for_status()
                await print_test_result("Delete Geographic Boundary", delete_data)
        except Exception as e:
            await print_test_result("Delete Geographic Boundary", error=str(e))

if __name__ == "__main__":
    asyncio.run(test_services())
