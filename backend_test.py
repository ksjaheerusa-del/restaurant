import requests
import sys
import json
from datetime import datetime

class RestaurantAPITester:
    def __init__(self, base_url="https://catrinas-tacos.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    resp_json = response.json()
                    print(f"Response: {json.dumps(resp_json, indent=2)[:200]}...")
                    return success, resp_json
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:300]}...")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timed out after {timeout}s")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )

    def test_status_check_create(self):
        """Test creating a status check"""
        test_data = {
            "client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"
        }
        return self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=test_data
        )

    def test_status_check_get(self):
        """Test getting status checks"""
        return self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )

    def test_create_waitlist_entry(self):
        """Test creating a waitlist entry"""
        test_data = {
            "name": f"Test Customer {datetime.now().strftime('%H%M%S')}",
            "phone": "(816) 555-0123",
            "party_size": 4,
            "date": "2024-12-25",
            "time": "7:00 PM",
            "special_requests": "Test reservation for API validation"
        }
        return self.run_test(
            "Create Waitlist Entry",
            "POST",
            "waitlist",
            200,
            data=test_data
        )

    def test_get_waitlist(self):
        """Test getting waitlist entries"""
        return self.run_test(
            "Get Waitlist Entries",
            "GET",
            "waitlist",
            200
        )

    def test_chat_endpoint(self):
        """Test the AI chat endpoint"""
        test_data = {
            "message": "What are your hours?",
            "session_id": None
        }
        success, response = self.run_test(
            "AI Chat - Hours Question",
            "POST",
            "chat",
            200,
            data=test_data,
            timeout=45  # Increased timeout for AI response
        )
        
        if success and 'session_id' in response:
            self.session_id = response['session_id']
            print(f"📝 Session ID received: {self.session_id}")
            
            # Test follow-up message with session
            follow_up_data = {
                "message": "What's your most popular dish?",
                "session_id": self.session_id
            }
            return self.run_test(
                "AI Chat - Follow-up Question",
                "POST", 
                "chat",
                200,
                data=follow_up_data,
                timeout=45
            )
        return success, response

    def test_invalid_waitlist_data(self):
        """Test waitlist with invalid data"""
        invalid_data = {
            "name": "",  # Empty name should fail validation
            "phone": "invalid-phone",
            "party_size": "not_a_number",
            "date": "invalid-date",
            "time": "invalid-time"
        }
        success, _ = self.run_test(
            "Invalid Waitlist Data (Should Fail)",
            "POST",
            "waitlist",
            422,  # Expect validation error
            data=invalid_data
        )
        return success, {}

def main():
    print("🌮 Starting Catrina's Tacos & Tequilas API Tests...")
    print("=" * 60)
    
    tester = RestaurantAPITester()

    # Test basic endpoints first
    print("\n📡 Testing Basic API Functionality...")
    tester.test_root_endpoint()
    tester.test_status_check_create()
    tester.test_status_check_get()

    # Test waitlist functionality
    print("\n📋 Testing Waitlist Functionality...")
    tester.test_create_waitlist_entry()
    tester.test_get_waitlist()
    tester.test_invalid_waitlist_data()

    # Test AI chat functionality
    print("\n🤖 Testing AI Chat Functionality...")
    tester.test_chat_endpoint()

    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! API is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())